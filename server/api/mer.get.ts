import axios from "axios";
export default defineEventHandler(async (event) => {
  const params = getQuery(event);

  const { data } = await axios({
    paramsSerializer: {
      encode: (params) => params,
    },
    url: `https://nasa-mer-photos-api.deno.dev/photos/`,
    method: "GET",
    params: {
      rover: params.rover,
      cameras: params.cameras,
      page_limit: params.page_limit,
      page: String(Number(params.page) + 1),
      sol: params.sol,
      order: params.order,
    },
  });

  return data;
});
