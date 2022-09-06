import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIN, Register } from '../redux/slices/userSlice';
import apiCalls from '../apiCalls';

function Profile() {
    const [logInDisplay, setLogInDisplay] = useState(true);
    const loggedStatus = useSelector((state)=>state.user.loggedStatus);
    const navigate = useNavigate()
    useEffect(()=>{
            if(loggedStatus){
                navigate('/user');
            }
    },[])
    
  return (
    <div className='min-h-[90vh] flex justify-center flex-col mx-auto pb-10'>
        <div className='transition-all ease-in duration-150 bg-cust-green/10 backdrop-blur-sm h-1/5 p-5 w-4/5 md:w-2/5 mx-auto rounded-lg'>
            {logInDisplay?<Login />:<Signup/>}
            <div>
                
                <p className='line-or text-cust-green w-4/5 mx-auto'>Or</p>
            </div>
            <div className='grid grid-cols-1 gap-2 w-3/5 mx-auto'>
                <h1 onClick={()=>setLogInDisplay(!logInDisplay)} className={`bg-cust-green text-center py-1 varela border hover:bg-cust-green/10 border-cust-green hover:text-white hover:border hover:border-cust-green`}>{logInDisplay?'SignUp':'LogIn'}</h1>
            </div>
        </div>
    </div>
  )
}

export default Profile

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UserLogin =(e)=>{
        e.preventDefault();
        const data = new FormData(document.getElementById('loginForm'));
        data.append('LogIN', '');
        apiCalls.post('',data).then(e=>{
            if(e.data.status === '1'){
                dispatch(logIN(e.data.data[0].id))
                localStorage.setItem('defView', true)
                navigate('/user');
            }else{
                toast.warn(e.data.data);
            }
        });   
    }
    
    return(
        <form onSubmit={UserLogin} id='loginForm'>
            <div className='my-5 grid grid-cols-1 gap-2'>
                <input type='email' name='loginEmail' id='email' className='bg-cust-dark/25 text-white/75 pl-3' placeholder='Email' required/>
                <input type={`password`} name='loginPassword' id='password' className='bg-cust-dark/25 text-white/75 pl-3' placeholder='Password' required/>
                <input type='submit' name='add' id='add' className='bg-cust-green text-center py-1 hover:bg-cust-green/10 border border-cust-green hover:text-white hover:border hover:border-cust-green varela font-bolder' value='LogIn'/>
            </div>
        </form>
    )

}
function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UserRegister =(e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        data.append('Register', '');
        if(e.target.password.value === e.target.confirmrPassword.value){
            apiCalls.post('',data).then(e=>{
                if(e.data.status === '1'){
                    dispatch(Register(e.data.data));
                    navigate('/user');
                    toast.success('success')
                }else{
                    toast.error(e.data.data);
                }
            }).catch((error)=>{
                toast.error(error.message);
            });          
        }else{
            toast.error(`Password Doesn't Match`);
        }
     
    }
    return(
        <form onSubmit={UserRegister}>
            <div className='my-5 grid grid-cols-1 gap-2'>
                <input type='text' name='username' className='bg-cust-dark/25 text-white/75 pl-3' placeholder='Name' required/>
                <input type='email' name='email' className='bg-cust-dark/25 text-white/75 pl-3' placeholder='Email' required/>
                <input type={`password`} name='password' className='bg-cust-dark/25 text-white/75 pl-3' placeholder='Password' required/>
                <input type={`password`} name='confirmrPassword' className='bg-cust-dark/25 text-white/75 pl-3' placeholder='Re-Password' required/>
                <input type='submit' className='bg-cust-green text-center py-1 hover:bg-cust-green/10 border border-cust-green hover:text-white hover:border hover:border-cust-green varela font-bolder' value='SignUp'/>
            </div>
        </form>
    )

}
