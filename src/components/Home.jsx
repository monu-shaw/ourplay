import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiCalls from '../apiCalls';
import {DetailCard} from './DetailCard'

function Home() {
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const Video = ()=>{
      apiCalls.get('?allVideo').then(e=>setVideo(e.data)); 
    }
    const test = ()=>{
      axios.get('https://fakestoreapi.com/products').then(e=>console.log(e.data)); 
    }
  
    return () => {
      Video();
      test()
      
    }
  }, [])
  
  
  return (
    <div className='text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
      {video.map(e=>(
        <DetailCard url={e.url} id={e.id} key={e.id} />
      ))}

    </div>
  )
}

export default Home