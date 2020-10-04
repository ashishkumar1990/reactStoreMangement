import { createStore } from "redux";
import userActionReducer from "./reducer/user-action-reducer";

export default createStore(userActionReducer);