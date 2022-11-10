import axios from "axios";
export default defineEventHandler(async (event) => {
  const { data } = await axios({
    url: `https://mars.nasa.gov/api/v1/raw_image_items/msl/latest/`,
    method: "GET",
  });

  // console.log(data);

  return data;
});
