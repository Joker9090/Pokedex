import { combineReducers } from "redux"
import main from "./main"

const rootReducer = combineReducers({
  main: main
})
type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;