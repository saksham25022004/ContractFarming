import React from 'react'
import useFeedback from '../hooks/useFeedback';
import { useSelector } from 'react-redux';

const Feedback = () => {

  useFeedback();

  const feed=useSelector(store=>store.buyer.feedback);

  const allfeed=feed?.posts;
  console.log(allfeed);

  return (
    <div>Feedback</div>
  )
}

export default Feedback;