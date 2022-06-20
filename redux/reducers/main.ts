import * as t from "../types";

const main = (state = {
  anything: "",
}, action: any) => {
  switch (action.type) {
    case t.SET_ANYTHING:
      return {
        ...state,
        anything: action.payload
      };
    default:
      return { ...state };
  }
}

export default main;