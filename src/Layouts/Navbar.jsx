import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logOUT } from '../redux/slices/userSlice';


function Navbar() {
  const [sideBar, setSideBar] = useState(false)
  const loggedStatus = useSelector((state)=>state.user.loggedStatus);
  const dispatch = useDispatch()
  const handelLogout = ()=>{
    setSideBar(!sideBar);
    localStorage.removeItem('defView');
    dispatch(logOUT());
  }
  return (
    <>
      <div className='bg-cust-dark flex justify-between p-4'>
        <h1><i onClick={()=>setSideBar(!sideBar)} className="hover:border-cust-green hover:border rounded-tr-lg rounded-bl-lg border-cust-dark border bg-cust-green/20 py-2 px-3 text-cust-green bi bi-list"></i></h1>
        <Link to='/'><h1 className='text-white'><i className="border-b border-t p-1 text-cust-green bi bi-play-circle-fill pr-2">/ ||</i>OurPlay</h1></Link>
        <h1><Link to='search'><i className="border-cust-dark border hover:border-cust-green hover:border rounded-tl-lg rounded-br-lg bg-cust-green/20 px-3 py-2  text-cust-green bi bi-search"></i></Link></h1>
      </div>
      <section className={`z-40 transition-all ease-in duration-3000 fixed top-0 left-0 bg-cust-green  py-4 backdrop-blur-md backdrop-sepia-1 bg-white/30 h-screen ${!sideBar?'w-0 md:w-0':'w-4/5 md:w-2/5'}`}>
        <h1 onClick={()=>setSideBar(!sideBar)} className={`bg-cust-green/30 animate-waving-hand absolute -right-3 pl-4  text-cust-green/100 p-3 rounded-tl-lg rounded-br-lg ${!sideBar?'hidden':''}`}><i className="bi bi-x-lg"></i></h1>
        <div className={`${!sideBar?'hidden':''}`}>
          <Link onClick={()=>setSideBar(!sideBar)} to='profile'><h1 className='mt-10 text-cust-green border-b pl-4'>Profile</h1></Link>
          <Link onClick={()=>setSideBar(!sideBar)} to='add'><h1 className='mt-2 text-cust-green border-b pl-4'>Add Video</h1></Link>
          <Link onClick={()=>setSideBar(!sideBar)} to='playlist'><h1 className='mt-2 text-cust-green border-b pl-4'>All PlayList</h1></Link>
          {loggedStatus?(<Link onClick={()=>handelLogout()} to='profile'><h1 className='mt-2 text-cust-green border-b pl-4'>LogOut</h1></Link>):''}
        </div>
        
          
      </section>
    </>
  )
}

export default Navbar