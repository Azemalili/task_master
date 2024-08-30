import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import app from '../firebaseConfig'
import { getDatabase, ref, get, set, remove } from 'firebase/database'
import { MdDeleteForever } from "react-icons/md";
import DeleteList from '../components/DeleteList';


export default function UserLists() {

  const navigate = useNavigate()
  let { userId } = useParams()
  let { userlist } = useParams()
  const [ currentName, setCurrentName ] = useState('')
  let [ allLists, setAllLists ] = useState([])
  const [ list, setList] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeDeleteModal = () => setShowDeleteModal(false);
  
console.log(list);

  
  const getAllDatas = useCallback(async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `userLists`);
    const snapshot = await get(dbRef)
    if(snapshot.exists()){
      setAllLists(Object.values(snapshot.val()))
    }
  },[allLists])

  const getData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `userLists/${userId}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setList(snapshot.val());
    }
  }
  
  

  const deleteList = async() => {
    const db = getDatabase(app);
    const dbRef = ref(db, `userLists/${userId}`);
    await remove(dbRef)
    .then(() => {
      setShowDeleteModal(false)
    })
    .then(() => {
      const data = allLists.filter(item => item.id !== userId)
      if(data.length !== 0){
        const filteredData = data[0]
        navigate(`/UserList/${filteredData.name}/${filteredData.id}`)
      }else{
        window.location.href = '/'
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
            <button variant="primary" onClick={() => {setShowDeleteModal(true)}} id='delete-list'>
              <MdDeleteForever />
            </button>

            <DeleteList closeDeleteModal={closeDeleteModal} showDeleteModal={showDeleteModal} deleteList={deleteList} />
          </>

          </div>
        </div>
    </div>
  )
}
