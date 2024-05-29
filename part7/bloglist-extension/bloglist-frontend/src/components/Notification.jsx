import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

const Notification = () => {

  const message = useSelector(state => state.notification.message)

  if (!message) {
    return null
  }

  return <div className="error">{message}</div>
}
export default Notification