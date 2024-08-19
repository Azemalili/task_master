import React, { useEffect, useState } from 'react'
import Home from '../pages/Home'
import { Outlet, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import app from '../firebaseConfig'
import { getDatabase, ref, set, push, get } from 'firebase/database'

export default function Layout() {

  let [inputValue, setInputValue] = useState('')
  let [data, setData] = useState([])


  const savedata = async (e) => {
      e.preventDefault();
      const name = inputValue
      const db = getDatabase(app);
      const taskRef = push(ref(db, 'userLists'));
      set(taskRef, {
        name: name,
        id: (data.length === 0) ? 0 : data.length 
      })
      .then(console.log('Data saved success fully'))
      .then(setInputValue(''))
      .then(
        () => {
          if(data.length === 0){
            window.location.reload()
          }
        }
      )
      .catch((error) => {
        alert('There is a problem storing data in database, please try again - ' + error.message)
      })
  }
  const getData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'userLists');
    const snapshot = await get(dbRef)
    if(snapshot.exists()){
      setData(Object.values(snapshot.val()))
    }
  }

  useEffect(
    () => {
      getData()
    },[data]
  )





  return (
    <div id='home'>
      <div id='left-sidebar'>
        <h1 style={{textAlign: 'center', marginTop: '30px'}} onClick={() => {document.location.href = '/'}}>Task master</h1>
        <hr style={{width: '80%', marginLeft: '10%'}} />
        <div className='main-lists'>
          <Link to='/' className='list'>Home</Link>
          <Link to='/List/Myday' className='list'>Myday</Link>
          <Link to='/List/Priority' className='list'>Priority</Link>
        </div>
        <hr style={{width: '80%', marginLeft: '10%'}} />
        <form 
          onSubmit={savedata}
        >
          <input 
          type="text" 
          placeholder='+ Add list' 
          id='add-list' 
          autoComplete='off'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }} />
        </form>
        <div id='user-lists'>
            {data.map((item, index)=> {
              return <Link key={index} id='user-list' to={`UserList/${item.name}?${item.id}`}>{item.name}</Link>
            })}
        </div>
      </div>
      <div id='right-sidebar'>
        <Outlet />
      </div>
    </div>
  )
}
