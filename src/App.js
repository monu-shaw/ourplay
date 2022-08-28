import React, {  useState } from 'react'
import Navbar from './Layouts/Navbar'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import Home from './components/Home'
import CustAdd from './components/CustAdd'
import CustPlayer from './components/CustPlayer'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify';
import ProfileHome from './components/ProfileHome'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Playlist from './components/Playlist'
import CustPlayerPlaylist from './components/CustPlayerPlaylist'



function App() {
  const [locationPage, setlocationPage] = useState();
  return (
    <div className='bg-cust-dark min-h-[100vh]'>
      <Provider store={store}>
        <BrowserRouter>
          {locationPage !== '/search' && <Navbar />}
          <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='search' element={<Search location={setlocationPage}/>} />
            {/* dev Routes */ }
            <Route path='add' element={<CustAdd/>}/>
            <Route path='video/:id' element={<CustPlayer/>}/>
            <Route path='videoplaylist/:id' element={<CustPlayerPlaylist />}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='user' element={<ProfileHome/>}/>
            <Route path='playlist' element={<Playlist/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
    
  )
}

export default App