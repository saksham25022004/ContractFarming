import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGovenmentReserve } from '../utils/farmerSlice';

const useGovenmentReserve = () => {

  const dispatch=useDispatch();

  const governmentReserve=useSelector(store=>store.farmer.governmentReserve);

  const getReserve= async ()=>{
      const data=await fetch('http://localhost:8080/reserve/allReserve', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const json=await data.json();

      dispatch(addGovenmentReserve(json));
  };

  useEffect(() => {
      if (!governmentReserve) {
          getReserve();
      }
  }, []);
}

export default useGovenmentReserve;