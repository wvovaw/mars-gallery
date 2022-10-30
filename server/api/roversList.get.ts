import axios from "axios";
export default defineEventHandler(async (event) => {
  const { data } = await axios({
    url: `${useRuntimeConfig().public.apiBase}/rovers`,
    method: "GET",
    params: {
      api_key: useRuntimeConfig().public.apiKey,
    },
  });
  const rovers = data.rovers;
  rovers[0].photo =
    "https://d2pn8kiwq2w21t.cloudfront.net/images/28-mission-current-MSL-Curiosity-alt.height-700.png"; // Cur
  rovers[1].photo =
    "https://www.pngall.com/wp-content/uploads/5/Mars-Rover-PNG-Transparent-HD-Photo.png"; // Spirit
  rovers[2].photo =
    "https://www.pngall.com/wp-content/uploads/5/Mars-Rover-PNG-Transparent-HD-Photo.png"; // Oppo
  rovers[3].photo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Perseverance_rover_design.png/1200px-Perseverance_rover_design.png";
  return rovers;
});
