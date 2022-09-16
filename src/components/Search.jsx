import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import apiCalls from '../apiCalls';
import { DetailCard, PlayListDetailCard } from './DetailCard';

function Search({location}) {
  const locationP = useLocation();
  const setPath=(x)=>{
    location(x);
  }
  const [searchResult, setsearchResult] = useState([]);
  const [SearchType, setSearchType] = useState('video');
  const [Filter, setFilter] = useState(false)
  const onTypeChange = (x)=>{
    setSearchType(x);
    setsearchResult([]);
  }
  const functionSearchType= (x)=>{
    apiCalls(x).then(e=>{
      if(+e.data !== 0){
        setsearchResult(e.data)
      }else{
        setsearchResult([]);
      }
    })
  }
  const search= (srcstr)=>{
    if(SearchType === 'video'){
      functionSearchType(`?search=${srcstr}`);
    }else{
      functionSearchType(`?searchPlaylist=${srcstr}`);
    }
  }
  useEffect(() => {
    setPath(locationP.pathname)
  }, [])
  
  return (
    <div className='transition-all ease-in duration-3000'>
      <div className='bg-cust-green/40 flex justify-between items-center p-2'>
        <h1 className=''><Link onClick={()=>location('')} to='/'><i className="hover:border-cust-green hover:border rounded-tr-lg rounded-bl-lg border-bg-cust-green/20 border bg-cust-green/20 py-2 px-3 text-cust-green bi bi-arrow-left"></i></Link></h1>
        <input type="text" name="" onChange={(e)=>search(e.target.value)} id="" className='w-4/5 bg-cust-green py-2 px-3 mx-2'/>
        <h1 onClick={()=>setFilter(true)} className='' ><i className="border-bg-cust-dark/20 border hover:border-cust-green hover:border rounded-tl-lg rounded-br-lg bg-cust-green/20 px-3 py-2 text-cust-green bi bi-filter"></i></h1>
      </div>
      {Filter && <FilterModel setFilter={setFilter} Filter={Filter} setSearchType={onTypeChange} />}
      <div className={`text-cust-dark dark:text-white grid mx-1 sm:grid-cols-1 ${searchResult.length !== 0?`md:grid-cols-3 lg:grid-cols-4`:``}  md:gap-4 ${Filter?`overflow-hidden h-[90vh]`:``}`}>
        {searchResult.length !== 0?(SearchType === 'video'?(searchResult?.map(e=>(
          <DetailCard url={e.url} id={e.id} key={e.id} title={e.name} img={e.img} upDatePath={setPath} />
        ))):(searchResult?.map(e=>(
          <PlayListDetailCard url={e.playListUrl} id={e.id} key={e.id} title={e.playListName} img={e.playListImg}  upDatePath={setPath} />
        )))):(<h1 className='text-cust-green/80 text-center mt-8 antialiased'>No Item</h1>)}
      </div>
      
    </div>
  )
}

export default Search

function FilterModel({setFilter, Filter, setSearchType}){
  return(
    <div className='flex justify-center w-screen h-full fixed top-14 backdrop-blur-sm backdrop-sepia-4'>
      <div className='fixed top-52 z-40 transition-all ease-in duration-3000 mx-auto bg-cust-green/20  p-2 backdrop-blur-lg backdrop-sepia-8  h-2/5 w-4/5 rounded-tr-lg rounded-bl-lg'>
        <div className='relative'>
          <i onClick={()=>setFilter(false)} className={`transition-all ease-in duration-10000 bi bi-x-lg bg-cust-green/30 absolute -top-7 pl-4 text-cust-green/100 p-3 rounded-tl-lg rounded-br-lg ${Filter?`-right-7`:`right-98`}`}></i>
          <div className="mb-8 text-white mx-auto grid grid-cols-1 w-4/5">
            <label className="form-label grid font-mono antialiased text-xl">Search Only</label>
            <select  id="linkType" onChange={(e)=>setSearchType(e.target.value)} className='bg-cust-dark p-2 border rounded-tr-lg rounded-bl-lg'>
            <option value="">Options</option>
              <option value="video">Video</option>
              <option value="playlist">Playlist</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}