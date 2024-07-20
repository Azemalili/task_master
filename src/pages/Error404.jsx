import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div style={{textAlign: 'center', marginTop: '120px'}}>
        <h1>Error 404</h1>
        <p>Page was not found, please go back to <Link to={'/'} >homepage</Link></p>
    </div>
  )
}
