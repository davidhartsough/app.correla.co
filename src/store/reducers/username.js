export default (
  state = {
    isChecking: false,
    isUnique: false,
    isFetching: false,
    suggestion: ""
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_USERNAME":
      return {
        ...state,
        isChecking: true
      };
    case "RECEIVE_USERNAME":
      return {
        ...state,
        isChecking: false,
        isUnique: action.isUnique
      };
    case "REQUEST_SUGGESTION":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_SUGGESTION":
      return {
        ...state,
        isFetching: false,
        suggestion: action.suggestion
      };
    default:
      return state;
  }
};
