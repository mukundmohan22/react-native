const initialState = null;

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'select_library':
      return payload;
    default:
      return state;
  }
};
