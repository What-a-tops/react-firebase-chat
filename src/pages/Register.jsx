import React, { useState } from 'react'
import { useNavigate, Link} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import def from "../assets/img/default.png"
import Add from "../assets/img/addAvatar.png"

export const Register = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setMsg(err.code)
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL:downloadURL,
                        })
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});

                        navigate("/");
                    });
                }
            );
        } catch (err) {
            setMsg(err.code)
            setErr(true)
            setLoading(false);
        }

    }
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Dadots Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter Name' />
                    <input type="email" placeholder='Enter Email' />
                    <input type="password" placeholder='Enter Password' />
                    <input style={{display:"none"}} type="file" id='file' />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sign Up</button>
                </form>
                {/*{loading && "Uploading and compressing the image please wait..."}*/}
                {err && <p>{msg}</p>}
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}
