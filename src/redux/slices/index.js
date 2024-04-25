import userReducer from "./UserSlice";
import { api } from "../../services/api";

const reducers = {
  api: api.reducer,
  user: userReducer,
};

export default reducers;
