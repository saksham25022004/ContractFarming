import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addYourCrops } from '../utils/farmerSlice';

const useYourCrops = () => {

  const dispatch=useDispatch();

    const yourCrops=useSelector(store=>store.buyer.yourCrops);

    const getYourCrops= async ()=>{

        const token = localStorage.getItem('token');

        const data=await fetch('http://localhost:8080/post/yourCrop', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const json=await data.json();

        dispatch(addYourCrops(json));
    };

    useEffect(() => {
        if (!yourCrops) {
            getYourCrops();
        }
    }, []);
}

export default useYourCrops;