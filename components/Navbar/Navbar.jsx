import Link from 'next/link'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Navbar() {
  const { user } = useUser()
  return (
    <div className='navbar'>
      <div>
        <Link className='navlink' href='/'>Home</Link>
        <Link className='navlink' href='/services'>Services</Link>
        <Link className='navlink' href='/about'>About</Link>
      </div>
      <div>
        {
            !user
              ? (
                <div>
                  <Link className='navlink' href='/api/auth/login'>Login</Link>
                </div>
                )
              : (
                <div className='user'>
                  <img src={user.picture} />
                  <span>{user.name}</span>
                  <Link className='navlink' href='/api/auth/logout'>Logout</Link>
                </div>
                )
        }
      </div>
    </div>
  )
}
