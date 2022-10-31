import axios from "axios";
export default defineEventHandler(async (event) => {
  const { data } = await axios({
    url: `${useRuntimeConfig().public.apiBase}/rovers/${
      event.context.params.rover
    }`,
    method: "GET",
    params: {
      api_key: useRuntimeConfig().public.apiKey,
    },
  });
  const rover = data.rover;
  return rover;
});
