import axios from "axios";
export default defineEventHandler(async (event) => {
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
      latest: true,
    },
  });

  // console.log(data);

  return data;
});
