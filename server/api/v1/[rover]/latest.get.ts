import axios from "axios";
export default defineEventHandler(async (event) => {
  const { data } = await axios({
    url: `${useRuntimeConfig().public.apiBase}/rovers/${
      event.context.params.rover
    }/latest_photos`,
    method: "GET",
    params: {
      api_key: useRuntimeConfig().public.apiKey,
    },
  });
  const rover_latest = data.latest_photos;
  return rover_latest;
});
