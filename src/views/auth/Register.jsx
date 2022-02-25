import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, registerWithEmailAndPassword } from '../../firebase-config'

const Register = ({ startLoader, completeLoader }) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  const register = async () => {
    if (!firstName || !lastName) alert('Please enter name')
    await registerWithEmailAndPassword(firstName, lastName, email, password)
  }

  useEffect(() => {
    startLoader()
    completeLoader()
  })

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
  }, [user, loading])

  return (
    <div className="flex justify-center items-center h-full min-h-screen">
      <div className="bg-gray-300 rounded shadow border border-emerald-300 w-full max-w-md px-8 py-6">
        <div className="text-3xl text-center pb-4">Register</div>
        {error && <div className="bg-red-500">{error}</div>}
        <input
          className="block w-full border px-4 py-2 my-2 rounded border-emerald-300"
          type="text"
          name="firstName"
          placeholder="first name"
          autoComplete="off"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          className="block w-full border px-4 py-2 my-2 rounded border-emerald-300"
          type="text"
          name="firstName"
          placeholder="last name"
          autoComplete="off"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
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
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Register
