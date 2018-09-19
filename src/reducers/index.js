import { combineReducers } from "redux";
import { categories } from "./categories";
import { favourites } from "./favourites";
import { keywordSearch } from "./keywordSearch";

export default combineReducers({
  categories, keywordSearch, favourites
});