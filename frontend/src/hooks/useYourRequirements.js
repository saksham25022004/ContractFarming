import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addYourRequirements } from "../utils/buyerSlice";

const useYourRequirement = () => {

    const dispatch=useDispatch();

    const YourRequirement=useSelector(store=>store.buyer.yourRequirements);

    const getYourRequirements= async ()=>{
        
        const token = localStorage.getItem('token');

        const data=await fetch('http://localhost:8080/post/yourRequirement', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const json=await data.json();

        dispatch(addYourRequirements(json));
    };

    useEffect(() => {
        if (!YourRequirement) {
            getYourRequirements();
        }
    }, []);
}

export default useYourRequirement;