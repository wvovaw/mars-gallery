import axios from "axios";

const getPerseverance = async () : Promise<Record<string, any>> => {
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

  return data;
};

const getCuriosity = async () : Promise<Record<string, any>> => {
  const { data } = await axios({
    url: `https://mars.nasa.gov/api/v1/raw_image_items/msl/latest/`,
    method: "GET",
  });

  return data.latest_data;
};

export default defineEventHandler(async (event) => {
  const roverName = getQuery(event).rover;

  if (roverName == "perseverance") return await getPerseverance();
  if (roverName == "curiosity") return await getCuriosity();
});
