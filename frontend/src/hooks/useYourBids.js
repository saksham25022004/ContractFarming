import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addYourBids } from '../utils/farmerSlice';

const useYourBids = () => {
    const dispatch=useDispatch();

    const yourBids=useSelector(store=>store.farmer.yourBids);

    const getYourBids= async ()=>{

        const token = localStorage.getItem('token');

        const data=await fetch('http://localhost:8080/bid/yourBids', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const json=await data.json();

        dispatch(addYourBids(json));
    };

    useEffect(() => {
        if (!yourBids) {
            getYourBids();
        }
    }, []);
}

export default useYourBids;