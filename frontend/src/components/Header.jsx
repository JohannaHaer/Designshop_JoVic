import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'


const Header = () => {
    // const {logout, user} = useStore()
    return (
        <>
            <NavLink to='/'><h1>The Deisgn Shop</h1></NavLink>
            <nav>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Register</NavLink>
                <Button>Logout</Button>
            </nav>
        </>
    )
}

export default Header