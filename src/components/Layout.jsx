import React from 'react'
import Home from '../pages/Home'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div id='home'>
      <div id='left-sidebar'>
        <h1 style={{textAlign: 'center', marginTop: '30px'}} onClick={() => {document.location.href = '/'}}>Task master</h1>
        <hr style={{width: '80%', marginLeft: '10%'}} />
        <div className='main-lists'>
          <Link to='/' className='list'>Home</Link>
          <Link to='/Myday' className='list'>Myday</Link>
          <Link to='/Priority' className='list'>Priority</Link>
        </div>
        <hr style={{width: '80%', marginLeft: '10%'}} />
        <div id='user-lists'>
            {}
        </div>
      </div>
      <div id='right-sidebar'>
        <Outlet />
      </div>
    </div>
  )
}
