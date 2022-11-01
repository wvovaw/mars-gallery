import axios from "axios";
export default defineEventHandler(async (event) => {
  const { data } = await axios({
    url: `${useRuntimeConfig().public.apiBase}/rovers`,
    method: "GET",
    params: {
      api_key: useRuntimeConfig().public.apiKey,
    },
  });
  // spi, oppo, cur, per
  const rovers = [
    data.rovers[3],
    data.rovers[0],
    data.rovers[2],
    data.rovers[1],
  ];

  rovers[3].photo = "/spirit.png"; // Spirit
  rovers[2].photo = "/spirit.png"; // Oppo
  rovers[1].photo = "/curiosity.png"; // Cur
  rovers[0].photo = "/perseverance.png"; // per
  return rovers;
});
