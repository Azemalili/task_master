import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import app from '../firebaseConfig'
import { getDatabase, ref, set, push, get } from 'firebase/database'
import UserLists from '../pages/UserLists'

export default function Layout() {

  let [inputValue, setInputValue] = useState('')
  let [data, setData] = useState([])
  let [myFireID, setMyFireID] = useState([])
  

  const getData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'userLists');
    const snapshot = await get(dbRef)
    if(snapshot.exists()){
      setData(Object.values(snapshot.val()))
    }
  }


  const savedata = (e) => {
      e.preventDefault();
      const name = inputValue
      const db = getDatabase(app);
      const taskRef = push(ref(db, 'userLists'));
      set(taskRef, {
        name: name
      })
      .then(async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, 'userLists');
        const snapshot = await get(dbRef)
        if(snapshot.exists()){
          const mydata = snapshot.val()
          const key = Object.keys(mydata).pop()
          const value = Object.values(mydata)
          const taskRef = ref(db, `userLists/${key}`);
            set(taskRef, {
              name: value[value.length-1].name,
              id: key
            })
        }
      })
      .then(setInputValue(''))
      // .then(e.target.blur())
      .then(
        () => {
          if(data.length === 0){
            window.location.reload()
          }else{
            e.target.blur()
          }
        }
      )
      .catch((error) => {
        alert('There is a problem storing data in database, please try again - ' + error.message)
      })
  }

  useEffect(
    () => {
      getData()
    },[getData]
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
              return (
                <Link 
                  key={index} 
                  id='user-list' 
                  to={`UserList/${item.name}/${item.id}`}
                  // onClick={}
                    >
                    {item.name}
                </Link>
              )
            })}
        </div>
      </div>
      <div id='right-sidebar'>
        <Outlet />
      </div>
    </div>
  )
}
