import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import apiCalls from '../apiCalls'
import {useParams} from 'react-router-dom'

function CustPlayer() {
    const [videoStatus, setvideoStatus] = useState([])
    const { id } = useParams()
    useEffect(()=>{
      const getVideo = ()=>{
        apiCalls.get(`?getOne=${id}`).then(e=>setvideoStatus(e.data))
      }
      getVideo()
      return ()=>{
        
      }
    },[])
  return (
    <div className='text-cust-dark dark:text-white grid md:grid-cols-1 md:w-3/5 lg:w-2/5 mx-auto'>
        <ReactPlayer className='h-4/5' width={'100%'} height={'180%'} controls={true} url={videoStatus.url} playing={true}/>
        
    </div>
  )
}

export default CustPlayer