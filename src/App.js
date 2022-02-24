import React, { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './firebase-config'
import { query, collection, getDocs, where } from 'firebase/firestore'
import Dashboard from './views/Dashboard'

const App = () => {
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setName(data.name)
    } catch (err) {
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }

  useEffect(() => {
    if (loading) return
    if (!user) return
    fetchUserName()
  }, [user, loading])

  return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
