export type SortType = "asc" | "desc";
export interface RoverApiFilters {
  sortType: SortType;
  showLatest: boolean;
  selectedLatestSols: number[];
  solRange: {
    from: number | null;
    to: number | null;
  };
  selectedCameras: string[];
}
export interface RoverApiPagination {
  perPage: number;
  selectedPage: number;
}
