import { createSlice } from "@reduxjs/toolkit";

const buyerSlice=createSlice({
    name:"buyer",
    initialState:{
        allCrops:null,
        allBids:null,
        yourRequirements:null,
    },
    reducers:{
        addAllCrops:(state, action)=>{
            state.allCrops=action.payload;
        },
        addAllBids:(state, action)=>{
            state.allBids=action.payload;
        },
        addYourRequirements:(state, action)=>{
            state.yourRequirements=action.payload;
        }
    }
});

export const { addAllCrops, addAllBids, addYourRequirements }=buyerSlice.actions;
export default buyerSlice.reducer;