import { SortType, RoverApiFilters, RoverApiPagination } from "./types";
interface ActiveRoverApiParams {
  sortType: SortType;
  fromSol: number;
  toSol: number;
  showLatest: boolean;
  selectedLatestSols: number[];
  itemsPerPage: number;
  selectedPage: number;
  selectedCameras: string[];
}

interface LegacyRoverApiParams {
  page_limit: number;
  page: number;
  order: SortType;
  selectedCameras: string[];
  fromSol: number;
  toSol: number;
}

export const getRoverPhotos = async (
  rover: string,
  filters: RoverApiFilters,
  pagination: RoverApiPagination
) => {
  const persAndCurApiParams: ActiveRoverApiParams = {
    sortType: filters.sortType,
    fromSol: filters.solRange.from as number,
    toSol: filters.solRange.to as number,
    showLatest: filters.showLatest,
    selectedLatestSols: filters.selectedLatestSols,
    selectedCameras: filters.selectedCameras,
    itemsPerPage: pagination.perPage,
    selectedPage: pagination.selectedPage,
  };
  const spirAndOppoApiParams: LegacyRoverApiParams = {
    page_limit: pagination.perPage,
    page: pagination.selectedPage,
    order: filters.sortType,
    selectedCameras: filters.selectedCameras,
    fromSol: filters.solRange.from as number,
    toSol: filters.solRange.to as number,
  };
  if (rover == "perseverance")
    return await getPerseverancePhotos(persAndCurApiParams);
  if (rover == "curiosity")
    return await getCuriosityPhotos(persAndCurApiParams);
  if (rover == "spirit") return getMerPhotos("spirit", spirAndOppoApiParams);
  if (rover == "opportunity")
    return getMerPhotos("opportunity", spirAndOppoApiParams);
};

const getPerseverancePhotos = async (filters: ActiveRoverApiParams) => {
  const url =
    `/api/photos?rover=perseverance&` +
    new URLSearchParams({
      order: `sol+${filters.sortType}`,
      condition_2:
        filters.fromSol != undefined ? `${filters.fromSol}:sol:gte` : "",
      condition_3: filters.showLatest
        ? `${filters.selectedLatestSols.join(",")}:sol:in`
        : filters.fromSol != undefined
        ? `${filters.toSol}:sol:lte`
        : "",
      num: String(filters.itemsPerPage),
      page: String(filters.selectedPage),
      search: filters.selectedCameras.join("|"),
    }).toString();

  const data: Record<string, any> = await $fetch(url);
  data["previews"] = data["images"].map(
    (item: Record<string, any>) => item.image_files.medium
  );
  data["fullres"] = data["images"].map(
    (item: Record<string, any>) => item.image_files.full_res
  );

  return data;
};

const getCuriosityPhotos = async (filters: ActiveRoverApiParams) => {
  const url =
    `/api/photos?rover=curiosity&` +
    new URLSearchParams({
      order: `sol+${filters.sortType}`,
      condition_2: filters.fromSol ? `${filters.fromSol}:sol:gte` : "",
      condition_3: filters.showLatest
        ? `${filters.selectedLatestSols.join(",")}:sol:in`
        : filters.toSol
        ? `${filters.toSol}:sol:lte`
        : "",
      num: String(filters.itemsPerPage),
      page: String(filters.selectedPage),
      search: filters.selectedCameras.join("|"),
    }).toString();

  const data: Record<string, any> = await $fetch(url);
  data["fullres"] = data["items"].map((item: Record<string, any>) => item.url);
  data["previews"] = data["fullres"];
  data["total_results"] = data["total"];
  return data;
};

const getMerPhotos = async (
  rover: "opportunity" | "spirit",
  filters: LegacyRoverApiParams
) => {

  const queryParams = {
    page_limit: String(filters.page_limit),
    page: String(filters.page),
    order: filters.order,
  };

  if (filters.selectedCameras.length != 0) {
    Object.defineProperty(queryParams, "cameras", {value: `[${filters.selectedCameras.join(",")}]`, enumerable: true});
  }

  let sol = "[";
  if (filters.fromSol != undefined)
    sol += filters.fromSol;
  sol += ":";
  if (filters.toSol != undefined) sol += filters.toSol;
  sol += "]";
  Object.defineProperty(queryParams, "sol", {value: sol, enumerable: true});

  const url =
    `/api/photos?rover=${rover}&` + new URLSearchParams(queryParams).toString();

  const data: Record<string, any> = await $fetch(url);
  data["fullres"] = data["photos"].map((item: Record<string, any>) => item.url);
  data["previews"] = data["fullres"];
  data["per_page"] = data["page_limit"];

  return data;
};
