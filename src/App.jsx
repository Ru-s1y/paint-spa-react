// import React, { useEffect } from 'react'
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Menu from './services/Menu'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

export default function App() {

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Menu />
    </AlertProvider>
  )
}
