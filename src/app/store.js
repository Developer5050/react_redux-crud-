import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailsSlice";

const store = configureStore({
  reducer: {
    app: userDetail,
  },
});

export default store;
