import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import apiCalls from '../apiCalls'
import {useParams} from 'react-router-dom'
import { GenriceButton } from './CustPlayerPlaylist'

function CustPlayer() {
    const [videoStatus, setvideoStatus] = useState([])
    const { id } = useParams()
    const [playbackSpeed, setPlaybackSpeed] = useState(0);
    useEffect(()=>{
      const getVideo = ()=>{
        apiCalls.get(`?getOne=${id}`).then(e=>setvideoStatus(e.data))
      }
      getVideo()
      let oldspeed = localStorage.getItem("pbspeed");
      if(oldspeed){
        setPlaybackSpeed(Number(oldspeed).toFixed(2))
      }else{
        setPlaybackSpeed(1)
      }
    },[])
    useEffect(()=>{
      if(playbackSpeed>0){
        localStorage.setItem("pbspeed",playbackSpeed);
      }
    },[playbackSpeed])
  return (
    <div className='text-cust-dark dark:text-white grid md:grid-cols-1 md:w-3/5 lg:w-2/5 mx-auto flex flex-col'>
        <ReactPlayer className='h-4/5' width={'100%'} height={'360px'} playbackRate={Number(playbackSpeed)} controls={true} url={videoStatus.url} playing={true}/>
        <div className='my-5 grid grid-cols-3 gap-2'> 
            <GenriceButton onClick={()=>setPlaybackSpeed(i=>+i -0.10 )}>-</GenriceButton>
            <input value={Number(playbackSpeed).toFixed(2)} className='bg-cust-dark/25 text-white/75 pl-3 text-center'/>
            <GenriceButton onClick={()=>setPlaybackSpeed(i=>+i +0.10 )}>+</GenriceButton>
        </div>
    </div>
  )
}

export default CustPlayer