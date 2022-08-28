import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import apiCalls from '../apiCalls';
import { DetailCard, PlayListDetailCard } from './DetailCard';
import { useSelector } from 'react-redux';

function ProfileHome() {
    const location = useLocation();
    const [ActiveLocation, setActiveLocation] = useState(true)
    const loggedStatus = useSelector((state)=>state.user.loggedStatus);
    const navigate = useNavigate()
    useEffect(()=>{
      const checkLoggedStatus =()=>{
          if(!loggedStatus){
              navigate('/profile') 
          }
      }
      return()=>{
          checkLoggedStatus()
      }
  },[])
  return (
    <div>
        <div className="grid grid-cols-2 justify-items-center mb-2">
          <div className={ActiveLocation?`text-cust-green border-b-2 w-full text-center bg-cust-green/30 py-2`:`py-2 text-white text-center border-b-2 w-full`} onClick={()=>setActiveLocation(true)}>Video</div>
          <div className={!ActiveLocation?`text-cust-green border-b-2 w-full text-center py-2 bg-cust-green/30`:`py-2 text-white w-full text-center border-b-2`} onClick={()=>setActiveLocation(false)}>PlayList</div>
        </div>
        {loggedStatus?(ActiveLocation?(<Video/>):(<PlayList/>)):''}
    </div>
  )
}

export default ProfileHome

function PlayList(){
  const userId = useSelector((s)=>s.user.userID);
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const Video = ()=>{
      apiCalls.get('?userPlaylist='+userId).then(e=>{
        if(e.data !== 0){
          setVideo(e.data);
        }
      }
        );
    }
  
    return () => {
      Video();
    }
  }, [])
  
  
  return (
    <div className='text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
      {video?.map(e=>(
        <PlayListDetailCard url={e.playListUrl} id={e.id} key={e.id} />
      ))}
    </div>
  )
}
function Video(){
  const userId = useSelector((state)=>state.user.userID);
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const Video = ()=>{
      apiCalls.get('?userVideos='+userId).then(e=>{
        if(e.data !== 0){
          setVideo(e.data)
        }
      });
    }
  
    return () => {
      Video();
    }
  }, [])
  
  
  return (
    <div className='text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
      {video?.map(e=>(
        <DetailCard url={e.url} id={e.id} key={e.id} />
      ))}
    </div>
  )
}