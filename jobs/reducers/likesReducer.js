import { LIKE_JOB, CLEAR_LIKED_JOB } from "../actions/types";
import { uniqBy } from "lodash";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LIKE_JOB:
      return uniqBy([payload, ...state], "jobkey");
    case CLEAR_LIKED_JOB:
      return initialState;
    default:
      return state;
  }
};
