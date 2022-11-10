import axios from "axios";
export default defineEventHandler(async (event) => {
  const params = getQuery(event);

  const { data } = await axios({
    paramsSerializer: {
      encode: (params) => params,
    },
    url: `https://mars.nasa.gov/api/v1/raw_image_items/`,
    method: "GET",
    params: {
      extended: "thumbnail::sample_type::noteq",
      order: params.order,
      condition_2: params.condition_2,
      condition_3: params.condition_3,
      search: params.search,
      per_page: params.num,
      page: params.page,
    },
  });

  // console.log(data);

  return data;
});
