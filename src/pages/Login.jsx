import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export const Login = () => {
    const [err, setErr] = useState(false)
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setMsg(err.code)
            setErr(true)
        } 
    }
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Dadots Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Enter Email' required/>
                    <input type="password" placeholder='Enter Password' required/>
                    <button>Login</button>
                    {err && <span>Invalid Password</span>}
                </form>
                <p>You do have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}
