import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import apiCalls from '../apiCalls';
import axios from 'axios';

function CustAdd() {
  const userId = useSelector(e=>e.user.userID);
  const loggedStatus = useSelector((state)=>state.user.loggedStatus);
  const navigate = useNavigate();
  const [formSubmit, setformSubmit] = useState(false);
  
  const AddVid = (x)=>{
    x.preventDefault();
    if(document.getElementById('addLinkUrl').value === ''){toast.warn('Empty Feild Not Allowed'); return}
    const data = new FormData(x.target);
    setformSubmit(true);
    axios.post('https://monu-linkpreview.herokuapp.com/',{
      url: document.getElementById('addLinkUrl').value
    }).then(e=>{
      if(document.getElementById('linkType').value === 'video'){
        data.append('addUrl', '');
        data.append('url', document.getElementById('addLinkUrl').value);
        data.append('name', e.data.data.title);
        data.append('img', e.data.data.img);
        data.append('addedByUser', userId);
        data.append('availableStatus', document.getElementById('privateType').value);
        apiCalls.post('',data,{
        headers: {
        'Content-Type': 'application/json'
        }
      }).then(e=>{
        setformSubmit(false);
        if(e.data.status === '1'){
          toast.success('Add SuccesFully')
          x.target.reset();
      }else{
          toast.warn(e.data.data);
      }
      }).catch(er=>{
        setformSubmit(false);
        toast.warn(er);
      });
    }else{
        data.append('addUrlPlaylist', '');
        data.append('playListUrl', document.getElementById('addLinkUrl').value);
        data.append('playListName', e.data.data.title);
        data.append('addedByUser', userId);
        data.append('availableStatus', document.getElementById('privateType').value);
      apiCalls.post('',data).then(e=>{
        setformSubmit(false);
        if(e.data.status === '1'){
          toast.success('Add SuccesFully')
          x.target.reset();
      }else{
          toast.warn(e.data.data);
      }
      }).catch(er=>{
        setformSubmit(false);
        toast.warn(er);
      });
    }
    }).catch(er=>{
      setformSubmit(false);
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
            <label className="form-label grid font-mono antialiased text-xl">Add Video Link</label>
            <input type='text' className="dark:text-light bg-cust-dark border-0 border-b border-cust-green" id="addLinkUrl" placeholder='Add Url of Video/Playlist' />
          </div>
          {/* <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <label className="form-label grid font-mono antialiased">Category</label>
            <input type='text' name="addLinkUrl" className="dark:text-light bg-cust-dark border-0 border-b border-cust-green" id="exampleInputEmail1" placeholder='Add Category' />
          </div> */}
          <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <select  id="linkType" className='bg-cust-dark p-2 border'>
              <option value="video">Video</option>
              <option value="playlist">Playlist</option>
            </select>
          </div>
          <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <select  id="privateType" className='bg-cust-dark p-2 border'>
              <option selected value="1">Public</option>
              <option value="0">Private</option>
            </select>
          </div>
          {formSubmit?(<button type="submit"  className={`transition ease-in-out w-3/5 py-1 bg-cust-green mx-auto font-medium rounded-sm antialiased disabled:opacity-75 `} disabled>LOADING..</button>):(<button type="submit"  className={`transition ease-in-out w-3/5 py-1 bg-cust-green mx-auto font-medium hover:bg-cust-green/75 rounded-sm antialiased`}>ADD</button>)}
        </form>
    </div>
  )
}

export default CustAdd