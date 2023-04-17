import axios from "axios";

const getPerseverance = async () => {
  const { data: perseveranceLatest } = await axios({
    url: "https://mars.nasa.gov/rss/api/",
    method: "GET",
    params: {
      ver: 1.2,
      feed: "raw_images",
      feedtype: "json",
      category: "mars2020,ingenuity",
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
      category: "mars2020,ingenuity",
      num: 1,
    },
  });
  const perseverance = {
    name: "Perseverance",
    landing_date: "2021-02-18",
    launch_date: "2020-07-30",
    status: "active",
    max_sol: perseveranceLatest.latest_sol as number,
    max_date: perseveranceLatest.latest as string,
    total_photos: perserveranceTotalPhotos.total_results as number,
    cameras: {
      NAVCAM_LEFT: {
        name: "Navigation Camera - Left",
        filter: "NAVCAM_LEFT",
      },
      NAVCAM_RIGHT: {
        name: "Navigation Camera - Right",
        filter: "NAVCAM_RIGHT",
      },
      FRONT_HAZCAM_LEFT: {
        name: "Front Hazard Avoidance Camera - Left",
        filter: "FRONT_HAZCAM_LEFT_A|FRONT_HAZCAM_LEFT_B",
      },
      FRONT_HAZCAM_RIGHT: {
        name: "Front Hazard Avoidance Camera - Right",
        filter: "FRONT_HAZCAM_RIGHT_A|FRONT_HAZCAM_RIGHT_B",
      },
      REAR_HAZCAM_LEFT: {
        name: "Rear Hazard Avoidance Camera - Left",
        filter: "REAR_HAZCAM_LEFT",
      },
      REAR_HAZCAM_RIGHT: {
        name: "Rear Hazard Avoidance Camera - Right",
        filter: "|REAR_HAZCAM_RIGHT",
      },
      CACHECAM: {
        name: "Sample Caching System (CacheCam)",
        filter: "CACHECAM",
      },
      MCZ_LEFT: { name: "Mast Camera Zoom - Left", filter: "MCZ_LEFT" },
      MCZ_RIGHT: { name: "Mast Camera Zoom - Right", filter: "MCZ_RIGHT" },
      SKYCAM: { name: "MEDA Skycam", filter: "SKYCAM" },
      PIXL_MCC: { name: "PIXL Micro Context Camera", filter: "PIXL_MCC" },
      SHERLOC_WATSON: {
        name: "SHERLOC WATSON Camera",
        filter: "SHERLOC_WATSON",
      },
      SHERLOC_CI: { name: "SHERLOC Context Imager", filter: "SHERLOC_ACI" },
      SUPERCAM_RMI: {
        name: "SuperCam Remote Micro Imager",
        filter: "SUPERCAM_RMI",
      },
      EDL_PUCAM1: {
        name: "Parachute Up-Look Camera A",
        filter: "EDL_PUCAM1",
      },
      EDL_PUCAM2: {
        name: "Parachute Up-Look Camera B",
        filter: "EDL_PUCAM2",
      },
      EDL_DDCAM: {
        name: "Descent Stage Down-Look Camera",
        filter: "EDL_DDCAM",
      },
      EDL_RUCAM: { name: "Rover Up-Look Camera", filter: "EDL_RUCAM" },
      EDL_RDCAM: { name: "Rover Down-Look Camera", filter: "EDL_RDCAM" },
      LCAM: { name: "Lander Vision System Camera", filter: "LCAM" },
      HELI_NAV: {
        name: "Mars Helicopter Navigation Camera",
        filter: "HELI_NAV",
      },
      HELI_RTE: { name: "Mars Helicopter Color Camera", filter: "HELI_RTE" },
    },
    photo: "/perseverance.png",
  };
  return perseverance;
};

const getCuriosity = async () => {
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

  const curiosity = {
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
    max_sol: curiosityLatest.latest_data.latest_sol as number,
    max_date: curiosityLatest.latest_data.latest as string,
    total_photos: curiosityTotalPhotos.total as number,
    cameras: {
      NAVCAM_LEFT: {
        name: "Navigation Camera - Left",
        filter: "NAV_LEFT_A|NAV_LEFT_B",
      },
      NAVCAM_RIGHT: {
        name: "Navigation Camera - Right",
        filter: "NAV_RIGHT_A|NAV_RIGHT_B",
      },
      FRONT_HAZCAM_LEFT: {
        name: "Front Hazard Avoidance Camera - Left",
        filter: "FHAZ_LEFT_A|FHAZ_LEFT_B",
      },
      FRONT_HAZCAM_RIGHT: {
        name: "Front Hazard Avoidance Camera - Right",
        filter: "FHAZ_RIGHT_A|FHAZ_RIGHT_B",
      },
      REAR_HAZCAM_LEFT: {
        name: "Rear Hazard Avoidance Camera - Left",
        filter: "RHAZ_LEFT_A|RHAZ_LEFT_B",
      },
      REAR_HAZCAM_RIGHT: {
        name: "Rear Hazard Avoidance Camera - Right",
        filter: "RHAZ_RIGHT_A|RHAZ_RIGHT_B",
      },
      CHEMCAM: { name: "Chemistry & Camera", filter: "CHEMCAM_RMI" },
      MARDI: { name: "Mars Descent Imager", filter: "MARDI" },
      MAHLI: { name: "Mars Hand Lens Imager", filter: "MAHLI" },
      MCZ_LEFT: { name: "Mast Camera Zoom - Left", filter: "MAST_LEFT" },
      MCZ_RIGHT: { name: "Mast Camera Zoom - Right", filter: "MAST_RIGHT" },
    },
    photo: "/curiosity.png",
  };
  return curiosity;
};
const opportunity = {
  name: "Opportunity",
  landing_date: "2004-01-25",
  launch_date: "2003-07-07",
  status: "complete",
  max_sol: 5111,
  max_date: "2018-06-11",
  total_photos: 228298,
  cameras: {
    FHAZ: { name: "Front Hazard Avoidance Camera", filter: "FHAZ" },
    RHAZ: { name: "Rear Hazard Avoidance Camera", filter: "RHAZ" },
    NAVCAM: { name: "Navigation Camera", filter: "NAVCAM" },
    PANCAM: { name: "Panoramic Camera", filter: "PANCAM" },
    MINITES: {
      name: "Thermal Emission Spectrometer",
      filter: "MINITEST",
    },
  },
  photo: "/spirit.png",
};
const spirit = {
  name: "Spirit",
  landing_date: "2004-01-04",
  launch_date: "2003-06-10",
  status: "complete",
  max_sol: 2208,
  max_date: "2010-03-21",
  total_photos: 128516,
  cameras: {
    FHAZ: { name: "Front Hazard Avoidance Camera", filter: "FHAZ" },
    RHAZ: { name: "Rear Hazard Avoidance Camera", filter: "RHAZ" },
    NAVCAM: { name: "Navigation Camera", filter: "NAVCAM" },
    PANCAM: { name: "Panoramic Camera", filter: "PANCAM" },
    MINITES: {
      name: "Thermal Emission Spectrometer",
      filter: "MINITEST",
    },
  },
  photo: "/spirit.png",
};

export default defineEventHandler(async (event) => {
  const roverName = String(getQuery(event).rover).toLowerCase();

  if (roverName == "perseverance") return await getPerseverance();
  if (roverName == "curiosity") return await getCuriosity();
  if (roverName == "spirit") return spirit;
  if (roverName == "opportunity") return opportunity;
});
