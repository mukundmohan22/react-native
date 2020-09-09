import axios from "axios";
import reverseGeocode from "latlng-to-zip";
import qs from "qs";
import {
  FECTH_JOBS,
  START_FECTH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOB,
} from "./types";
import DUMMY_DATA from "../assets/DUMMY_DATA.json";

const JOB_ROOT_URL = "http://api.indeed.com/ads/apisearch?";
const JOB_QUERY_PARAMS = {
  publisher: "4201738803816157",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10,
  q: "javascript",
};

const buildJobsUrl = (zipcode) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zipcode });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callBack) => async (dispatch) => {
  dispatch({ type: START_FECTH_JOBS });
  console.log("fetchJobs");
  try {
    let zipcode = await reverseGeocode(
      region,
      "YOUR API KEY"
    );
    const url = buildJobsUrl(zipcode);
    let data = DUMMY_DATA;
    dispatch({ type: FECTH_JOBS, payload: data });
    callBack();
  } catch (error) {
    console.log("error ho gaya", error);
  }
};

export const likeJob = (job) => {
  return { type: LIKE_JOB, payload: job };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOB };
};
