import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Deskstop from '../pages/Deskstop'
import AddUser from '../pages/AddUser'
import Edit from '../pages/Edit'

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path='/desktop' element={<Deskstop/>}/>
        <Route path='/addusers' element={<AddUser/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </>
  )
}

export default AdminRoute
