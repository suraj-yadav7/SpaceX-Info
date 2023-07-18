import { createSlice } from "@reduxjs/toolkit";


const mainSlices = createSlice({
    name: "mainSlices",
    initialState:{
        capsules:"",
        rockets:'',
        crew:""
    },

    reducers:{
        demo:(state,action)=>{
            state.capsules=(action.payload)
        }
    },
    extraReducers:{

    }



})

export default mainSlices.reducer
export const {demo}=mainSlices.actions;