import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback } from '../utils/farmerSlice';

const useFeedback = () => {
    const dispatch=useDispatch();

    const feedback=useSelector(store=>store.farmer.feedback);

    const getFeedback= async ()=>{
        const data=await fetch('http://localhost:8080/post/feedback', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json=await data.json();

        dispatch(addFeedback(json));
    };

    useEffect(() => {
        if (!feedback) {
            getFeedback();
        }
    }, []);
}

export default useFeedback;