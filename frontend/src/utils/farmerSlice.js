import { createSlice } from "@reduxjs/toolkit";

const farmerSlice=createSlice({
    name:"farmer",
    initialState:{
        yourCrops:null,
        yourBids:null,
        allRequirements:null,
        feedback:null,
        govenmentReserve:null,
    },
    reducers:{
        addYourCrops:(state, action)=>{
            state.yourCrops=action.payload;
        },
        addYourBids:(state, action)=>{
            state.yourBids=action.payload;
        },
        addAllRequirements:(state, action)=>{
            state.allRequirements=action.payload;
        },
        addFeedback:(state, action)=>{
            state.feedback=action.payload;
        },
        addGovenmentReserve:(state, action)=>{
            state.govenmentReserve=action.payload;
        }
    }
});

export const { addYourCrops, addYourBids, addAllRequirements, addFeedback, addGovenmentReserve}=farmerSlice.actions;
export default farmerSlice.reducer;