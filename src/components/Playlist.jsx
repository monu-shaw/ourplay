import React, { useEffect, useState } from 'react'
import apiCalls from '../apiCalls';
import {DetailCard, PlayListDetailCard} from './DetailCard'

function Playlist()  {
    const [video, setVideo] = useState([]);
    const [errorAny, setError] = useState(false)
    useEffect(() => {
      const Video = ()=>{
        apiCalls.get('?allPlaylist').then(e=>{
            if(e.data != 0){
                setVideo(e.data);
                setError(false)
            }else{
              setError(true)
            }
            
        });
      }
      Video();
      return () => {
        
      }
    }, [])
    
    
    return (
      <div className='text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
        {video.map(e=>(
          <PlayListDetailCard url={e.playListUrl} id={e.id} key={e.id} />
        ))}
        {errorAny?(<h2 className='text-center'>No Playlist Found</h2>):''}
  
      </div>
    )
  }

export default Playlist