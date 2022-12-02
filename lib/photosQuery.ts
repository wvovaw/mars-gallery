export const getRoverPhotos = async (rover, params) => {
  if (rover == "perseverance") return await getPerseverancePhotos(params);
  if (rover == "curiosity") return await getCuriosityPhotos(params);
  if (rover == "spirit") return getMerPhotos(rover, params);
  if (rover == "opportunity") return getMerPhotos(rover, params);
};

const getPerseverancePhotos = async (params) => {
  const url =
    `/api/photos?rover=perseverance&` +
    new URLSearchParams({
      order: `sol+${params.sortType}`,
      condition_2:
        params.fromSol != undefined ? `${params.fromSol}:sol:gte` : "",
      condition_3: params.showLatest
        ? `${params.selectedLatestSols.join(",")}:sol:in`
        : params.fromSol != undefined
        ? `${params.toSol}:sol:lte`
        : "",
      num: params.itemsPerPage,
      page: params.selectedPage,
      search: params.selectedCameras.join("|"),
    }).toString();

  const data = await $fetch(url);
  data["previews"] = data["images"].map((item) => item.image_files.medium);
  data["fullres"] = data["images"].map((item) => item.image_files.full_res);

  return data;
};

const getCuriosityPhotos = async (params) => {
  const url =
    `/api/photos?rover=curiosity&` +
    new URLSearchParams({
      order: `sol+${params.sortType}`,
      condition_2:
        params.fromSol != undefined && params.fromSol != ""
          ? `${params.fromSol}:sol:gte`
          : "",
      condition_3: params.showLatest
        ? `${params.selectedLatestSols.join(",")}:sol:in`
        : params.toSol != undefined && params.toSol != ""
        ? `${params.toSol}:sol:lte`
        : "",
      num: params.itemsPerPage,
      page: params.selectedPage,
      search: params.selectedCameras.join("|"),
    }).toString();

  const data = await $fetch(url);
  data["fullres"] = data["items"].map((item) => item.url);
  data["previews"] = data["fullres"];
  data["total_results"] = data["total"];
  return data;
};

const getMerPhotos = async (rover, params) => {
  if (params.selectedCameras.length != 0)
    params["cameras"] = `[${params.selectedCameras.join(",")}]`;

  let sol = "[";
  if (params.fromSol != undefined && params.fromSol != "")
    sol += params.fromSol;
  sol += ":";
  if (params.toSol != undefined && params.toSol != "") sol += params.toSol;
  sol += "]";
  params["sol"] = sol;

  const url =
    `/api/photos?rover=${rover}&` + new URLSearchParams(params).toString();
  const data = await $fetch(url);
  data["fullres"] = data["photos"].map((item) => item.url);
  data["previews"] = data["fullres"];
  data["per_page"] = data["page_limit"];

  return data;
};
