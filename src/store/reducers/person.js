export default (
  state = {
    isFetching: false,
    data: {}
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_PERSON":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_PERSON":
      return {
        ...state,
        isFetching: false,
        data: action.person
      };
    default:
      return state;
  }
};
