import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Correct_ans from './correct_ans/Correct_ans'
function App() {

  return (
    <>
      <div className="container">
        <div className="topBar"><h1>Educate</h1></div>
        
          <Correct_ans/>
      
      </div>
    </>
  )
}

export default App
