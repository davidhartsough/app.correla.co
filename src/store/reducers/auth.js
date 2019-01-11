export default (
  state = {
    isFetching: false,
    isLoggedIn: false,
    isAnonymous: false
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_AUTH":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_AUTH":
      return {
        ...state,
        isFetching: false,
        isLoggedIn: action.isLoggedIn,
        isAnonymous: action.isAnonymous
      };
    default:
      return state;
  }
};
