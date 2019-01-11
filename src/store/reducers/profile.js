export default (
  state = {
    isFetching: false,
    data: {}
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_PROFILE":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_PROFILE":
      return {
        ...state,
        isFetching: false,
        data: action.profile
      };
    default:
      return state;
  }
};
