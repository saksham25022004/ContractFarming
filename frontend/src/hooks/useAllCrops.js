import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addAllCrops } from "../utils/buyerSlice";

const useAllCrops = () => {

    const dispatch=useDispatch();

    const AllCrops=useSelector(store=>store.buyer.allCrops);

    const getAllCrops= async ()=>{
        const data=await fetch('http://localhost:8080/post/allPosts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json=await data.json();

        dispatch(addAllCrops(json));
    };

    useEffect(() => {
        if (!AllCrops) {
            getAllCrops();
        }
    }, []);
}

export default useAllCrops;