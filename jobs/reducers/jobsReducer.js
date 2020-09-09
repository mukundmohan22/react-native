import { FECTH_JOBS ,START_FECTH_JOBS} from "../actions/types";

const initialState = {
  results: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_FECTH_JOBS:
      return { ...state, isLoading: true };
    case FECTH_JOBS:
      return { ...state, results: payload.results, isLoading: false };
    default:
      return state;
  }
};
