import React, { useState } from 'react'
import './oneword.css'
import questionsData from '../../questions/one_word.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Oneword = () => {
    const [givenAns, setGivenAns] = useState('');
    const [correct, setCorrect] = useState(null);
    const { speak } = useSpeechSynthesis();
    const speakCorrect = "That's right, you are correct";
	const isWrong = "Sorry, you are wrong, try again";
    const handleChange = (e) => {
        setGivenAns(e.target.value)
    }
    const handleSubmit = (param) => {
        const userInput = givenAns.toLowerCase(); 
        const correctAnswer = param.toLowerCase(); 
        if (userInput === correctAnswer) {
            console.log("true");
            setCorrect(true);
            speak({ text: speakCorrect});
        } else {
            console.log('false');
            setCorrect(false);
            speak({ text:isWrong});
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
                                {correct === true && <div className="rw">You are right!!</div>}
                                {correct === false && <div className="rw">Sorry You are wrong, try again</div>}
                                <button className="submit-button" onClick={() => handleSubmit(item.answer)}>Submit</button>

                            </div>

                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Oneword