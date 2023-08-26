import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Oneword from './oneword_ans/oneword'
import questionsData from '../../client/questions/one_word.json'
function App() {
  return (
    <>
      <div className="container">
        <div className="topBar"><h1>Educate</h1></div>
        <Oneword />
      </div>
    </>
  )
}

export default App
