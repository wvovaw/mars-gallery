import axios from "axios";
export default defineEventHandler(async (event) => {
  const params = getQuery(event);

  const { data } = await axios({
    paramsSerializer: {
      encode: (params) => params,
    },
    url: `https://mars.nasa.gov/rss/api/`,
    method: "GET",
    params: {
      ver: 1.2,
      feed: "raw_images",
      feedtype: "json",
      category: "mars2020,ingenuity",
      order: params.order,
      condition_2: params.condition_2,
      condition_3: params.condition_3,
      search: params.search,
      num: params.num,
      page: params.page,
    },
  });

  // console.log(data);

  return data;
});
