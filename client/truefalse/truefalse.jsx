import React, { useState } from 'react';
import './truefalse.css'
import questionsData from '../questions/true_false.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Truefalse = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [points, setPoints] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { speak } = useSpeechSynthesis();
    const speakCorrect = "That's right you are correct";
    const isWrong = "Sorry you are wrong";
    const handleOptionChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    };

    const handleNextQuestion = () => {
        if (submitted) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
            setIsCorrect({});
            setSubmitted(false);
        }
    };

    const handleSubmit = (param1, param2, points) => {
        if (param1 === selectedOption) {
            console.log("true");

            speak({ text: speakCorrect });
            setIsCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: true,
            }));
            setPoints((prevPoints) => prevPoints + points);
        }
        else if (selectedOption === null) {
            return
        }

        else {
            console.log("false");

            speak({ text: isWrong });
            setIsCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: false,
            }));
        }
        setSubmitted(true);
    };
    return (
        <>
            <div className="topBar"><h1>Educate</h1></div>
            <div className="truefalsebg">

                <div className="section">
                    <h3>Section 3 - True or False</h3>
                    <h3>Level: {questionsData[currentQuestionIndex]?.difficulty}, Points : {questionsData[currentQuestionIndex]?.points}</h3>
                </div>
                <div className="template1">
                    <div key={questionsData[currentQuestionIndex]?.id}>
                        {currentQuestionIndex < questionsData.length ? (
                            <>
                                <h3>{questionsData[currentQuestionIndex]?.question}</h3>
                                <label className='label1'>
                                    <input type="radio" value="True" name="ans" onChange={handleOptionChange} disabled={submitted}/>
                                    True
                                </label>
                                <br />
                                <label className='label1'>
                                    <input type="radio" value="False" name="ans" onChange={handleOptionChange} disabled={submitted}/>
                                    False
                                </label>
                                <button className="submit-button" onClick={() => handleSubmit(questionsData[currentQuestionIndex]?.answer, questionsData[currentQuestionIndex]?.id, questionsData[currentQuestionIndex]?.points)} disabled={submitted}>Submit</button>
                                {isCorrect[questionsData[currentQuestionIndex]?.id] === true && (
                                    <div className="rw">You are right!!</div>
                                )}
                                {isCorrect[questionsData[currentQuestionIndex]?.id] === false && (
                                    <div className="rw">Sorry, you are wrong</div>
                                )}
                                <button className="next-button" onClick={handleNextQuestion} disabled={!submitted}>
                                    Next Question
                                </button>
                                <h4 className="score1">Points: {points}</h4>
                            </>
                        ) : (
                            <div className="quiz-over-message1">
                                Quiz Over! Your total points: {points}
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </>
    )
}

export default Truefalse