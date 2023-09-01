import React, { useState } from 'react'
import './oneword.css'
import questionsData from '../../questions/one_word.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Oneword = () => {
    const [givenAns, setGivenAns] = useState('');
    const [correct, setCorrect] = useState({});
    const { speak } = useSpeechSynthesis();
    const [submitted, setSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const speakCorrect = "That's right, you are correct";
    const isWrong = "Sorry, you are wrong, try again";
    const handleChange = (e) => {
        setGivenAns(e.target.value)
    }
    const handleNextQuestion = () => {
        if (submitted) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setGivenAns('');
            setCorrect({});
            setSubmitted(false);
        }
    };
    const handleSubmit = (param1, param2) => {
        const userInput = givenAns.toLowerCase();
        const correctAnswer = param1.toLowerCase();
        if (userInput === correctAnswer) {
            console.log("true");
            
            speak({ text: speakCorrect });
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: true,
            }));
        }
        else if (givenAns === '') {
            return
        }
        else {
            console.log('false');
           
            speak({ text: isWrong });
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: false,
            }));
        }   
        setSubmitted(true);
    }

    return (
        <>
            <div className="topBar"><h1>Educate</h1></div>
            <div className="onewordbg">
                <div className="section">
                    <h3>Section 1 - Fill in the blank</h3>
                    <h3>Level: {questionsData[currentQuestionIndex]?.difficulty}</h3>
                </div>
                <div className="template">
                    <div key={questionsData[currentQuestionIndex]?.id}>
                        {currentQuestionIndex < questionsData.length ? (
                            <>
                                <h3>{questionsData[currentQuestionIndex]?.question}</h3>
                                <input
                                    type="text"
                                    placeholder="Type your answer here"
                                    className="answer-input"
                                    onChange={handleChange}
                                    value={givenAns}
                                />
                                {correct[questionsData[currentQuestionIndex]?.id] === true && (
                                    <div className="rw">You are right!!</div>
                                )}
                                {correct[questionsData[currentQuestionIndex]?.id] === false && (
                                    <div className="rw">Sorry, you are wrong, try again</div>
                                )}
                                <button className="submit-button" onClick={() => handleSubmit(questionsData[currentQuestionIndex]?.answer, questionsData[currentQuestionIndex]?.id)}>
                                    Submit
                                </button>
                                <button className="next-button" onClick={handleNextQuestion} disabled={!submitted}>
                                    Next Question
                                </button>
                            </>
                        ) : (
                            <div className="quiz-over-message">
                                Quiz Over!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Oneword