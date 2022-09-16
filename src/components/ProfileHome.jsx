import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import apiCalls from '../apiCalls';
import { DetailCard, PlayListDetailCard } from './DetailCard';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchPlaylistNVideo, fetchVideo } from '../redux/slices/userSlice';

function ProfileHome() {
    
    const location = useLocation();
    const [ActiveLocation, setActiveLocation] = useState(true)
    const loggedStatus = useSelector((state)=>state.user.loggedStatus);
    const navigate = useNavigate();
    const setDefaultLocationWithLocalstorage = (x) => {
      setActiveLocation(x)
      localStorage.setItem('defView', x)
    }
    useEffect(()=>{
      
      const getDefaultLocationWithLocalstorage = ()=>{
        if(localStorage.getItem('defView') === 'true'){
          setActiveLocation(true);
        }else{
          setActiveLocation(false);
        }
      }

      if(!loggedStatus){
        navigate('/profile') 
      }
      getDefaultLocationWithLocalstorage();
      return()=>{
          //getDefaultLocationWithLocalstorage();
          
      }
  },[])
  return (
    <div className=''>
        <div className="grid grid-cols-2 justify-items-center mb-2">
          <div className={ActiveLocation?`transition-all ease-out delay-100 text-cust-green border-b-2 w-full text-center bg-cust-green/30 py-2`:`py-2 text-white text-center border-b-2 w-full`} onClick={()=>setDefaultLocationWithLocalstorage(true)}>Video</div>
          <div className={!ActiveLocation?`transition-all ease-in delay-150 text-cust-green border-b-2 w-full text-center py-2 bg-cust-green/30`:`py-2 text-white w-full text-center border-b-2`} onClick={()=>setDefaultLocationWithLocalstorage(false)}>PlayList</div>
        </div>
        {loggedStatus?(ActiveLocation?(<Video/>):(<PlayList/>)):''}
    </div>
  )
}

export default ProfileHome

function PlayList(){
  const dispatch = useDispatch();

  const userId = useSelector((s)=>s.user.userID);
  const noRecord = useSelector(s=>s.user.userNoPlayList);
  const video = useSelector(s=>s.user.userPlayList);

  useEffect(() => {
    const Video = ()=>{
    dispatch(fetchPlaylistNVideo(userId));
    }
    if(video.length === 0 && noRecord === false){
      Video();
    }
      
  }, [])
  
  
  return (
    <div className='text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
      {noRecord && <NoRecord recived={`Playlist`}/>}
      {video?.map(e=>(
        <PlayListDetailCard url={e.playListUrl} id={e.id} key={e.id} title={e.playListName} img={e.playListImg} />
      ))}
    </div>
  )
}
function Video(){
  const dispatch = useDispatch();

  const userId = useSelector((s)=>s.user.userID);
  const noRecord = useSelector(s=>s.user.userNoVideo);
  const video = useSelector(s=>s.user.userVideo);

  useEffect(() => {
    const Video = ()=>{
    dispatch(fetchVideo(userId));
    }
    if(video.length === 0 && noRecord === false){
      Video();
    }
      
  }, [])
  
  
  return (
    <div className='text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
      {noRecord && <NoRecord recived={`Video`}/>}
      {video?.map(e=>(
        <DetailCard url={e.url} id={e.id} key={e.id} title={e.name} img={e.img} />
      ))}
    </div>
  )
}

function NoRecord({recived}){
  return(
    <>
      <h6 className='p-4 text-center text-cust-green/30'>You Have Not Saved Any {recived}</h6>
    </>
  );
}