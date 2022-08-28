import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

function CustAdd() {
  const userId = useSelector(e=>e.user.userID);
  const loggedStatus = useSelector((state)=>state.user.loggedStatus);
  const navigate = useNavigate()
  
  const AddVid = (e)=>{
    e.preventDefault();
    axios.post('https://monu-linkpreview.herokuapp.com/',{
      url: document.getElementById('addLinkUrl').value
    }).then(e=>{
      if(document.getElementById('linkType').value === 'video'){
        axios.post('http://localhost/ourplayapi/ajax.inc.php',{
        addUrl: '',
        url: document.getElementById('addLinkUrl').value,
        name: e.data.data.title,
        img: e.data.data.img,
        addedByUser: userId
      }).then(e=>{
        if(e.data.status === '1'){
          toast.success('Add SuccesFully')
      }else{
          toast.warn(e.data.data);
      }
      }).catch(er=>{
        toast.warn(er);
      });
    }else{
      axios.post('http://localhost/ourplayapi/ajax.inc.php',{
        addUrlPlaylist: '',
        playListUrl: document.getElementById('addLinkUrl').value,
        playListName: e.data.data.title,
        addedByUser: userId
      }).then(e=>{
        if(e.data.status === '1'){
          toast.success('Add SuccesFully')
      }else{
          toast.warn(e.data.data);
      }
      }).catch(er=>{
        toast.warn(er);
      });
    }
    }).catch(er=>{
      toast.warn(er);
    });
  }

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
        <form onSubmit={AddVid} className='flex justify-center flex-col h-4/5 mt-10'>
          <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <label className="form-label grid font-mono antialiased">Add Video Link</label>
            <input type='text' name="addLinkUrl" className="dark:text-light bg-cust-dark border-0 border-b border-cust-green" id="addLinkUrl" placeholder='Add Url of Video/Playlist' />
          </div>
          {/* <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <label className="form-label grid font-mono antialiased">Category</label>
            <input type='text' name="addLinkUrl" className="dark:text-light bg-cust-dark border-0 border-b border-cust-green" id="exampleInputEmail1" placeholder='Add Category' />
          </div> */}
          <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <select name="" id="linkType" className='bg-cust-dark p-2 border'>
              <option value="video">Video</option>
              <option value="playlist">Playlist</option>
            </select>
          </div>
          <button type="submit" className="transition ease-in-out w-3/5 py-1 bg-cust-green mx-auto  hover:animate-pulse">Add</button>
        </form>
    </div>
  )
}

export default CustAdd