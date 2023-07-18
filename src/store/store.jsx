import { configureStore } from "@reduxjs/toolkit";
import mainSlices from "./slices/mainSlices";

const store=configureStore({
    reducer:{
        itemInfo:mainSlices
    }
})


export default store