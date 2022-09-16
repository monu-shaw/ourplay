import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function DetailCard(props) {
/* const [Video, setVideo] = useState({
    img:'',
    title:'',
    description: '',
    domain: '',
    origin: ''
}); */
 const upDate = ()=>{
  if (props.upDatePath) {
    props.upDatePath('')
  }
 }
  /* useEffect(()=>{
    axios.post('https://monu-linkpreview.herokuapp.com/',{
      url: props.url
    }).then(e=>setVideo({...e.data.data}));
  },[]) */
  return (
    <div className='text-white my-1'>
        <Link to={'/video/'+props.id} onClick={()=>upDate()}>
        <div className='mx-auto rounded-md shadow-md'>
            <img src={props.img} alt="" className='rounded-t-lg' />
            <h6 className='font-serif'>{props.title}</h6>
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
const upDate = ()=>{
  if (props.upDatePath) {
    props.upDatePath('')
  }
 }
  useEffect(()=>{
    if(props.img === ''){
    axios.post('https://monu-linkpreview.herokuapp.com/',{
      url: props.url
    }).then(e=>setVideo({...e.data.data}));}
  },[])
  return (
    <div className='text-white'>
        <Link to={'/videoplaylist/'+props.id} onClick={()=>upDate()}>
        <div className='mx-auto rounded-xl shadow-md'>
            <img src={props.img ===''?Video.img:props.img} alt="" style={{width: '100%', height: '210px'}} className='rounded-t-lg' />
            <div className="uppercase tracking-wide text-sm px-1 text-indigo-500 font-semibold">{Video.title?'PlayList':''}</div>
            <p className='font-serif mt-2 px-1'>{props.title}</p>
        </div>
        </Link>
    </div>
  )
}

