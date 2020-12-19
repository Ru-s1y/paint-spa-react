import React, { useEffect } from 'react'
import Menu from './services/Menu'

export default function App() {

  useEffect(() => {
    console.log("レンダリング")
  })

  return <Menu />
}
