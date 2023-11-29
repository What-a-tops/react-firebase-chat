import React, {useContext, useState} from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import ImageChecker from "./ImageChecker.jsx";

export const Navbar = () => {
    const { currentUser } = useContext(AuthContext)

    const [isValidImage, setIsValidImage] = useState(true);

    // console.log(currentUser?.photoURL)

    return (
        <div className='navbar'>
            <span className='logo'>Dadot's Chat </span>
            <div className='user'>
                <ImageChecker photoUrl={currentUser?.photoURL} />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}
