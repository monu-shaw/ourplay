import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function DetailCard(props) {
const [Video, setVideo] = useState({
    img:'',
    title:'',
    description: '',
    domain: '',
    origin: ''
});
  useEffect(()=>{
    axios.post('https://monu-linkpreview.herokuapp.com/',{
      url: props.url
    }).then(e=>setVideo({...e.data.data}));
  },[])
  return (
    <div className='text-white my-1'>
        <Link to={'video/'+props.id}>
        <div className='mx-auto rounded-md shadow-md'>
            <img src={Video.img} alt="" className='rounded-t-lg' />
            <h6 className='font-serif'>{Video.title}</h6>
        </div>
        </Link>
    </div>
  )
}
export function PlayListDetailCard(props) {
const [Video, setVideo] = useState({
    img:'',
    title:'',
    description: '',
    domain: '',
    origin: ''
});
  useEffect(()=>{
    axios.post('https://monu-linkpreview.herokuapp.com/',{
      url: props.url
    }).then(e=>setVideo({...e.data.data}));
  },[])
  return (
    <div className='text-white'>
        <Link to={'/videoplaylist/'+props.id}>
        <div className='mx-auto rounded-xl shadow-md'>
            <img src={Video.img} alt="" style={{width: '100%', height: '210px'}} className='rounded-t-lg' />
            <div className="uppercase tracking-wide text-sm px-1 text-indigo-500 font-semibold">{Video.title?'PlayList':''}</div>
            <p className='font-serif mt-2 px-1'>{Video.title}</p>
        </div>
        </Link>
    </div>
  )
}

