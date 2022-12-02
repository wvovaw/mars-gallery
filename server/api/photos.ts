import axios from "axios";

const getPerseverance = async (params) => {
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
};

const getCuriosity = async (params) => {
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

  return data;
};

const getMer = async (rover, params) => {
  const { data } = await axios({
    paramsSerializer: {
      encode: (params) => params,
    },
    url: `https://nasa-mer-photos-api.deno.dev/photos/`,
    method: "GET",
    params: {
      rover: rover,
      cameras: params.cameras,
      page_limit: params.page_limit,
      page: String(Number(params.page) + 1),
      sol: params.sol,
      order: params.order,
    },
  });

  return data;
};

export default defineEventHandler(async (event) => {
  const roverName = getQuery(event).rover;
  const params = getQuery(event);

  if (roverName == "perseverance") return await getPerseverance(params);
  if (roverName == "curiosity") return await getCuriosity(params);
  if (roverName == "spirit") return await getMer("spirit", params);
  if (roverName == "opportunity") return await getMer("opportunity", params);
});
