import data from './LibraryList.json';

const initialState = data;

export default (state = initialState, {type, payload}) => {
  switch (type) {
    default:
      return state;
  }
};
