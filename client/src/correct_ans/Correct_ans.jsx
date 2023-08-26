import React, { useState } from 'react'
import './correct_ans.scss'
import questions  from '../../questions/correct_ans.json'
import { useSpeechSynthesis } from 'react-speech-kit'
import crow from '../images/crow.png'
const Correct_ans = () => {
    const [option,selectedOption]= useState(null);
    const {speak}=useSpeechSynthesis()
    const text = "Choose the odd one out"
const handleOnClick =()=>{
    speak({text:text})
}


const handleOptionChange = (event) => {
    // this.setState({ selectedOption: event.target.value });
    selectedOption(event.target.value)
  }

  const handleSubmit = (event,param)=>{
    
    
    console.log(param)
    if(param===option)
        console.log("true");
    else
        console.log("false");
}

  return (
    <>
    {questions && questions.map(question=>(
        <div className='correct'>   
    <div className="left">
        <div className="talk" onClick={handleOnClick}>
            
            <div className="questiona">
                Choose the Odd one Out!!
            </div>
        </div>
        
    </div>
    <div className="right">
        {console.log(question.option1)}
        <form  onSubmit={handleSubmit(question.answer)}className='formi'>
        <label>
        <input type="radio" value="option1" name="ans" checked={selectedOption === 'option1'}  onChange={handleOptionChange}/>
        {question.option1}
        <div><img src={question?.option1_url} alt="" style={{width:"40%"}} /></div>
        
      </label>
      <br />
      <label>
        <input type="radio" value="option2" name='ans' checked={selectedOption === 'option2'} onChange={handleOptionChange}/>
        {question.option2}
        <div><img src={question?.option2_url} alt="" style={{width:"40%"}} /></div>
        
      </label>
      <br />
      <label>
        <input type="radio" value="option3" name='ans' checked={selectedOption === 'option3'} onChange={handleOptionChange}/>
        {question.option3}
        <div><img src={question?.option3_url} alt="" style={{width:"40%"}} /></div>
        
      </label>
      <label>
        <input type="radio" value="option4" name='ans' checked={selectedOption === 'option4'} onChange={handleOptionChange}/>
        {question.option4}
        <div><img src={crow} alt="" style={{width:"40%"}} /></div>
      </label>
        <button type='submit'>Submit</button>
        </form>
        
        
        
    </div>
    </div>
    ))}
    </>
  )
}

export default Correct_ans