import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import apiCalls from '../apiCalls'
import {useParams} from 'react-router-dom'

function CustPlayerPlaylist() {
    const [videoStatus, setvideoStatus] = useState([])
    const { id } = useParams()
    useEffect(()=>{
      const getVideo = ()=>{
        apiCalls.get(`?getPlaylist=${id}`).then(e=>setvideoStatus(e.data))
      }
      return ()=>{
        getVideo()
      }
    },[])
  return (
    <div className='text-cust-dark dark:text-white grid md:grid-cols-1 md:w-3/5 lg:w-2/5 mx-auto'>
        <ReactPlayer className='h-4/5' width={'100%'} height={'180%'} controls={true} url={videoStatus.playListUrl} playing={false}/>
        
    </div>
  )
}

export default CustPlayerPlaylist