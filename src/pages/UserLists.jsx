import React from 'react'
import { useParams } from 'react-router'

export default function UserLists() {

  let { userlist } = useParams()
  console.log(userlist);
  
  
  return (
    <div>
        <h1>User </h1>
    </div>
  )
}
