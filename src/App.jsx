import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Footer from './components/Footer'
import Header from './components/Header'
import { auth, db } from './firebase-config'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/Dashboard'
import Home from './views/Home'

const App = () => {
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const loaderRef = useRef(null)

  const startLoader = () => {
    if (loaderRef) {
      loaderRef?.current?.continuousStart(0, 500)
    }
  }

  const completeLoader = () => {
    if (loaderRef) {
      loaderRef?.current?.complete()
    }
  }

  const fetchUserName = async () => {
    try {
      startLoader()
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      console.log(data, 39)
      setName(data.name)
      completeLoader()
    } catch (err) {
      completeLoader()
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }

  useEffect(() => {
    if (loading) return
    if (!user) return
    fetchUserName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  return (
    <div>
      <LoadingBar color="#1b74e4" height={5} shadow ref={loaderRef} />
      <Header
        user={user}
        startLoader={startLoader}
        completeLoader={completeLoader}
      />
      <div className="h-full">
        <Routes>
          <Route
            path="/"
            element={
              <Home startLoader={startLoader} completeLoader={completeLoader} />
            }
          />
          <Route
            path="auth/login"
            element={
              <Login
                startLoader={startLoader}
                completeLoader={completeLoader}
              />
            }
          />
          <Route
            path="auth/register"
            element={
              <Register
                startLoader={startLoader}
                completeLoader={completeLoader}
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <Dashboard
                startLoader={startLoader}
                completeLoader={completeLoader}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
