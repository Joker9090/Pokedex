import * as t from "../types";
// import axios from "axios";


export const setAnything = (anything: any) => (dispatch: any) => {
  console.log(process.env.NEXT_PUBLIC_API_URI)
  dispatch({
    type: t.SET_ANYTHING,
    payload: anything
  });
}
