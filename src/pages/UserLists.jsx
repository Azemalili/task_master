import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import app from '../firebaseConfig'
import { getDatabase, ref, get, set, remove } from 'firebase/database'
import { MdDeleteForever } from "react-icons/md";
import { Button, Modal } from 'react-bootstrap';


export default function UserLists() {

  const navigate = useNavigate()
  let { userId } = useParams()
  let { userlist } = useParams()
  const [ currentName, setCurrentName ] = useState('')
  let [ allLists, setAllLists ] = useState([])
  const [ lists, setLists] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  
  const getAllDatas = useCallback(async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `userLists`);
    const snapshot = await get(dbRef)
    if(snapshot.exists()){
      setAllLists(Object.values(snapshot.val()))
    }
  })

  const getData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `userLists/${userId}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setLists(snapshot.val());
    }
  };
  
  

  const deleteList = async() => {
    const db = getDatabase(app);
    const dbRef = ref(db, `userLists/${userId}`);
    await remove(dbRef)
    .then(() => {
      handleClose()
    })
    .then(() => {
      const data = allLists.filter(item => item.id !== userId)
      if(data.length !== 0){
        const filteredData = data[0]
        navigate(`/UserList/${filteredData.name}/${filteredData.id}`)
      }else{
        navigate('/')
        window.location.reload();
      }
    })
    .catch((error) => {
      alert('There is a problem deleting data from database, please try again - ' + error.message)
    })
  }
  useEffect(() => {
    setCurrentName(userlist)
  },[userlist])

  useEffect(() => {
     getData()
  }, [getData])
  
  
  useEffect(() => {
    getAllDatas()
  }, [getAllDatas])

  
  return (
    <div >
        <div id='user-list-header'>
          <form 
              onSubmit={async(e) => {
                e.preventDefault();
                const db = getDatabase(app);
                const dbRef = ref(db, `userLists/${userId}`);
                const snapshot = await get(dbRef)
                if(snapshot.exists()){
                  const taskRef = ref(db, `userLists/${userId}`);
                  set(taskRef, {
                    name: e.target.elements[0].value,
                    id: userId
                  })
                  .then(() => {
                    navigate(`/UserList/${e.target.elements[0].value}/${userId}`)
                    e.target.elements[0].blur();
                  })
                }
              }}>
            <input 
              type="text" 
              value={currentName}
              onChange={(e) => {
                setCurrentName(e.target.value)
              }}
              id='change-list-name'
              autoComplete='off'
            />
          </form>
          <div>
          <>
            <button variant="primary" onClick={handleShow} id='delete-list'>
              <MdDeleteForever />
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{padding: '30px'}}>Deleting this list is a <b>permanent action</b>. Once deleted, the list and all its associated tasks will be permanently removed from your account, and this change cannot be undone. Please confirm if you're sure you want to proceed.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={deleteList}>
                  Delete list
                </Button>
              </Modal.Footer>
            </Modal> 
          </>

          </div>
        </div>
    </div>
  )
}
