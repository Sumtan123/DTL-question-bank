import React, { useState } from 'react'
import './oneword.css'
import questionsData from '../../questions/one_word.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Oneword = () => {
    const [givenAns, setGivenAns] = useState('');
    const [correct,setCorrect]= useState({});
    const { speak } = useSpeechSynthesis();
    const speakCorrect = "That's right, you are correct";
	const isWrong = "Sorry, you are wrong, try again";
    const handleChange = (e) => {
        setGivenAns(e.target.value)
    }
    const handleSubmit = (param1,param2) => {
        const userInput = givenAns.toLowerCase(); 
        const correctAnswer = param1.toLowerCase(); 
        if (userInput === correctAnswer) {
            console.log("true");
            setCorrect(true);
            speak({ text: speakCorrect});
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: true,
              }));
        } 
        else if(givenAns===''){
            return
        }
            else {
            console.log('false');
            setCorrect(false);
            speak({ text:isWrong});
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: false,
              }));
        }
    }
    
    return (
        <>
        <div className="topBar"><h1>Educate</h1></div>
            <div className="onewordbg">
                {questionsData.map((item) => (
                    <>
                        <div className="section">
                            <h3>Section 1-Fill in the blank</h3>
                            <h3>Level : {item.difficulty}</h3>
                        </div>
                        <div className="template">
                            <div key={item.id}>
                                <h3>{item.question}</h3>
                                <input
                                    type="text"
                                    placeholder="Type your answer here"
                                    className="answer-input"
                                    onChange={handleChange}
                                />
                                {correct[item.id] === true && <div className="rw">You are right!!</div>}
                                {correct[item.id] === false && <div className="rw">Sorry You are wrong, try again</div>}
                                <button className="submit-button" onClick={() => handleSubmit(item.answer,item.id)}>Submit</button>

                            </div>

                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Oneword