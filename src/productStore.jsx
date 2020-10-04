import { createStore } from "redux";
import productActionReducer from "./reducer/product-action-reducer";

export default createStore(productActionReducer);