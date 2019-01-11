export default (
  state = {
    isFetching: false,
    data: []
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_PEOPLE":
      return {
        ...state,
        isFetching: true
      };
    case "RECEIVE_PEOPLE":
      return {
        ...state,
        isFetching: false,
        data: action.people
      };
    default:
      return state;
  }
};
