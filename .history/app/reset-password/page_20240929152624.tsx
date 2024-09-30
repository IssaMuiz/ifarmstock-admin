/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return <p>Loading....</p>
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }


    try {
      const res = await axios.post("/api/reset-password", {token, 
        password: newPassword
      })
      if (res.status === 200) {
        router.push("/")
      }
    } catch (error: any) {
      setErrorMessage(error.res?.data?.error || "An error occured. Please try again")
    }
  }
  return (
    <form onSubmit={handleReset}>
      <h1>Reset Password</h1>
      {errorMessage && <p>{errorMessage}</p>}

      <input type="password" placeholder='New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

      <button type='submit'>Reset Password</button>
    </form>
  )
}

export default ResetPassword
