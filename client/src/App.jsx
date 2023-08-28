import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Oneword from './oneword_ans/oneword'
import Correct_ans from './correct_ans/Correct_ans'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import questionsData from '../../client/questions/one_word.json'
const Card = ({ imageSrc, title, description, path }) => (
  <div className="card">
    <img src={imageSrc} alt={title} className="card-image" />
    <div className="card-content">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <a href={path} className="card-link">
        Click here to take up the quiz!
      </a>
    </div>
  </div>
);
function App() {
  return (
    <>
      <div className="container">
        <div className="topBar"><h1>Educate</h1></div>
        <div className="app">
          <Card
            imageSrc="https://img.freepik.com/free-photo/word-text-wooden-dices-brown-desk_23-2148101507.jpg?size=626&ext=jpg&ga=GA1.1.1873050670.1691914218&semt=ais"
            title="One Word Answers"
            description="Explore by clicking on the button below!"
            path="/oneword" // Replace with the correct path
          />
          <Card
            imageSrc="https://img.freepik.com/free-photo/arrows-pointing-randomly-with-copy-space_23-2148445498.jpg?size=626&ext=jpg&ga=GA1.1.1873050670.1691914218&semt=ais"
            title="Odd one out"
            description="Explore by clicking on the button below!"
            path="/correctans" // Replace with the correct path
          />
          {/* Add more cards here */}
        </div>
      </div>
    </>
  )
}

export default App
