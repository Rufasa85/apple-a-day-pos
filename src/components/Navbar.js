import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className='container flex'>
             <Link to="/new-shift" className='mx-4 underline text-primary'>New Shift</Link>
             <Link to="/service" className='mx-4 underline text-primary'>Service</Link>
             <Link to="/reports" className='mx-4 underline text-primary'>Reports</Link>
        </div>
    )
}

export default Navbar