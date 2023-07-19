import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// This function will fetch company data using below api call
export const fetchCompnayDetails = createAsyncThunk ("fetchCompany", async(arg,{rejectWithValue}) => {
    let response = await fetch("https://api.spacexdata.com/v4/company")
    try{
        let apiData = await response.json()
        // console.log("the fetched", apiData)
        return apiData
    }
    catch(error){
        rejectWithValue(error)
    }
})


const mainSlices = createSlice({
    name: "mainSlices",
    initialState:{
        companyData:"",
        loading:false,
        error:null
    },

    reducers:{
        demo:(state,action)=>{
            state.capsules=(action.payload)
        }
    },
    extraReducers:{
        [fetchCompnayDetails.pending]:(state)=>{
            state.loading=true
        },
        [fetchCompnayDetails.fulfilled]:(state,action)=>{
            state.companyData=action.payload
        },
        [fetchCompnayDetails.rejected]:(state,action)=>{
            state.error=action.pay
        },
    }



})

export default mainSlices.reducer
export const {demo}=mainSlices.actions;