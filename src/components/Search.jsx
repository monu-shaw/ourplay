import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import apiCalls from '../apiCalls';
import { DetailCard } from './DetailCard';

function Search({location}) {
  const locationP = useLocation();
  location(locationP.pathname)
  const [searchResult, setsearchResult] = useState([]);
  const search= (srcstr)=>{
    console.log(srcstr);
    apiCalls(`?search=${srcstr}`).then(e=>setsearchResult(e.data))
  }
  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  
  return (
    <div>
      <div className='bg-cust-green/40 flex justify-between items-center p-4'>
        <h1 className=''><Link onClick={()=>location('')} to='/'><i className="hover:border-cust-green hover:border rounded-tr-lg rounded-bl-lg border-bg-cust-green/20 border bg-cust-green/20 py-2 px-3 text-cust-green bi bi-arrow-left"></i></Link></h1>
        <input type="text" name="" onChange={(e)=>search(e.target.value)} id="" className='w-4/5 bg-cust-green py-2 px-3 mx-2'/>
        <h1 className='' ><i className="border-bg-cust-dark/20 border hover:border-cust-green hover:border rounded-tl-lg rounded-br-lg bg-cust-green/20 px-3 py-2 text-cust-green bi bi-search"></i></h1>
      </div>
      {searchResult?.map(e=>(
        <DetailCard url={e.url} id={e.id} key={e.id} />
      ))}
    </div>
  )
}

export default Search