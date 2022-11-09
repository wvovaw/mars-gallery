import axios from "axios";
export default defineEventHandler(async (event) => {
  const { data: perseveranceLatest } = await axios({
    url: "https://mars.nasa.gov/rss/api/",
    method: "GET",
    params: {
      ver: 1.2,
      feed: "raw_images",
      feedtype: "json",
      category: "mars2020,ingenunity",
      latest: true,
    },
  });
  const { data: perserveranceTotalPhotos } = await axios({
    url: "https://mars.nasa.gov/rss/api/",
    method: "GET",
    params: {
      ver: 1.2,
      feed: "raw_images",
      feedtype: "json",
      category: "mars2020,ingenunity",
      num: 1,
    },
  });
  const { data: curiosityLatest } = await axios({
    url: "https://mars.nasa.gov/api/v1/raw_image_items/msl/latest/",
    method: "GET",
  });
  const { data: curiosityTotalPhotos } = await axios({
    url: "https://mars.nasa.gov/api/v1/raw_image_items/",
    method: "GET",
    params: {
      per_page: 1,
      extended: "thumbnail::sample_type::noteq",
    },
  });

  const rovers = [
    {
      name: "Perseverance",
      landing_date: "2021-02-18",
      launch_date: "2020-07-30",
      status: "active",
      max_sol: perseveranceLatest.latest_sol,
      max_date: perseveranceLatest.latest,
      total_photos: perserveranceTotalPhotos.total_results,
      cameras: {
        NAVCAM_LEFT:  { name: "Navigation Camera - Left", filter: "NAVCAM_LEFT" },
        NAVCAM_RIGHT: { name: "Navigation Camera - Right", filter: "NAVCAM_RIGHT" },
        FRONT_HAZCAM_LEFT: { name: "Front Hazard Avoidance Camera - Left", filter: "FRONT_HAZCAM_LEFT_A|FRONT_HAZCAM_LEFT_B" },
        FRONT_HAZCAM_RIGHT:{ name: "Front Hazard Avoidance Camera - Right", filter: "FRONT_HAZCAM_RIGHT_A|FRONT_HAZCAM_RIGHT_B" },
        REAR_HAZCAM_LEFT: { name:"Rear Hazard Avoidance Camera - Left", filter: "REAR_HAZCAM_LEFT" },
        REAR_HAZCAM_RIGHT: { name:"Rear Hazard Avoidance Camera - Right", filter: "|REAR_HAZCAM_RIGHT" },
        CACHECAM: { name:"Sample Caching System (CacheCam)", filter: "CACHECAM" },
        MCZ_LEFT: { name:"Mast Camera Zoom - Left", filter: "MCZ_LEFT" },
        MCZ_RIGHT: { name:"Mast Camera Zoom - Right", filter: "MCZ_RIGHT" },
        SKYCAM: { name:"MEDA Skycam", filter: "SKYCAM" },
        PIXL_MCC: { name:"PIXL Micro Context Camera", filter: "PIXL_MCC" },
        SHERLOC_WATSON: { name:"SHERLOC WATSON Camera", filter: "SHERLOC_WATSON" },
        SHERLOC_CI: { name:"SHERLOC Context Imager", filter: "SHERLOC_ACI" },
        SUPERCAM_RMI: { name:"SuperCam Remote Micro Imager", filter: "SUPERCAM_RMI" },
        EDL_PUCAM1: { name:"Parachute Up-Look Camera A", filter: "EDL_PUCAM1" },
        EDL_PUCAM2: { name:"Parachute Up-Look Camera B", filter: "EDL_PUCAM2" },
        EDL_DDCAM: { name:"Descent Stage Down-Look Camera", filter: "EDL_DDCAM" },
        EDL_RUCAM: { name:"Rover Up-Look Camera", filter: "EDL_RUCAM" },
        EDL_RDCAM: { name:"Rover Down-Look Camera", filter: "EDL_RDCAM" },
        LCAM: { name:"Lander Vision System Camera", filter: "LCAM" },
        HELI_NAV: { name:"Mars Helicopter Navigation Camera", filter: "HELI_NAV" },
        HELI_RTE: { name:"Mars Helicopter Color Camera", filter: "HELI_RTE" },
      },
      photo: "/perseverance.png",
    },
    {
      name: "Curiosity",
      landing_date: "2012-08-06",
      launch_date: "2011-11-26",
      status: "active",
      max_sol: curiosityLatest.latest_data.latest_sol,
      max_date: curiosityLatest.latest_data.latest,
      total_photos: curiosityTotalPhotos.total,
      cameras: {
        NAVCAM_LEFT: "Navigation Camera - Left", // NAV_LEFT_A|NAV_LEFT_B
        NAVCAM_RIGHT: "Navigation Camera - Right", // NAV_RIGHT_A|NAV_RIGHT_B
        FRONT_HAZCAM_LEFT: "Front Hazard Avoidance Camera - Left", //FHAZ_LEFT_A|FHAZ_LEFT_B
        FRONT_HAZCAM_RIGHT: "Front Hazard Avoidance Camera - Right", //FHAZ_RIGHT_A|FHAZ_RIGHT_B|
        REAR_HAZCAM_LEFT: "Rear Hazard Avoidance Camera - Left", // RHAZ_LEFT_A|RHAZ_LEFT_B
        REAR_HAZCAM_RIGHT: "Rear Hazard Avoidance Camera - Right", // RHAZ_RIGHT_A|RHAZ_RIGHT_B
        CHEMCAM: "Chemistry & Camera", // CHEMCAM_RMI
        MARDI: "Mars Descent Imager", // MARDI
        MAHLI: "Mars Hand Lens Imager", // MAHLI
        MCZ_LEFT: "Mast Camera Zoom - Left", // MAST_LEFT
        MCZ_RIGHT: "Mast Camera Zoom - Right", // MAST_RIGHT
      },
      photo: "/curiosity.png",
    },
    {
      name: "Opportunity",
      landing_date: "2004-01-25",
      launch_date: "2003-07-07",
      status: "complete",
      max_sol: 5111,
      max_date: "2018-06-11",
      total_photos: 228298,
      cameras: {
        FHAZ: "Front Hazard Avoidance Camera", // FHAZ
        RHAZ: "Rear Hazard Avoidance Camera", // RHAZ
        NAVCAM: "Navigation Camera", // NAVCAM
        PANCAM: "Panoramic Camera", // PANCAM
        MINITES: "Miniature Thermal Emission Spectrometer (Mini-TES)", // MINITEST
        ENTRY: "Entry, Descent, and Landing Camera",
      },
      photo: "/spirit.png",
    },
    {
      name: "Spirit",
      landing_date: "2004-01-04",
      launch_date: "2003-06-10",
      status: "complete",
      max_sol: 2208,
      max_date: "2010-03-21",
      total_photos: 128516,
      cameras: {
        FHAZ: "Front Hazard Avoidance Camera", // FHAZ
        RHAZ: "Rear Hazard Avoidance Camera", // RHAZ
        NAVCAM: "Navigation Camera", // NAVCAM
        PANCAM: "Panoramic Camera", // PANCAM
        MINITES: "Miniature Thermal Emission Spectrometer (Mini-TES)", // MINITEST
        ENTRY: "Entry, Descent, and Landing Camera",
      },
      photo: "/spirit.png",
    },
  ];

  return rovers;
});
