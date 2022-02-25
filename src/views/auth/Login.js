import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, logInWithEmailAndPassword } from '../../firebase-config'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <div className="flex justify-center items-center h-full min-h-screen">
      <div className="bg-gray-300 rounded shadow border h-80 border-emerald-300 w-full max-w-lg px-8 py-6">
        <div className="text-3xl text-center pb-4">Login</div>
        {error && <div className="bg-red-500">{error}</div>}
        <input
          className="block w-full border px-4 py-2 my-2 rounded border-emerald-300"
          type="email"
          name="email"
          placeholder="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="block w-full border px-4 py-2 my-2 rounded border-emerald-300"
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="w-full bg-emerald-400 py-2 px-4 rounded"
          type="submit"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Login
