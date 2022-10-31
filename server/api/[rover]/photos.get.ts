import axios from "axios";
export default defineEventHandler(async (event) => {
  const params = Object.assign(
    {},
    { api_key: useRuntimeConfig().public.apiKey },
    { sol: getQuery(event).sol },
    getQuery(event).camera === "" ? null : { camera: getQuery(event).camera }
  );
  const { data } = await axios({
    url: `${useRuntimeConfig().public.apiBase}/rovers/${
      event.context.params.rover
    }/photos`,
    method: "GET",
    params,
  });
  const rover_photos = data.photos;
  return rover_photos;
});
