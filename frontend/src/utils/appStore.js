import { configureStore } from "@reduxjs/toolkit";
import farmerReducer from "./farmerSlice";
import buyerReducer from "./buyerSlice";

const appStore=configureStore({
    reducer:{
        farmer:farmerReducer,
        buyer:buyerReducer
    }
});

export default appStore;