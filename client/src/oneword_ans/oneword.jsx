import React, { useState } from 'react'
import './oneword.css'
import questionsData from '../../questions/one_word.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Oneword = () => {
    const [givenAns, setGivenAns] = useState('');
    const [correct, setCorrect] = useState({});
    const { speak } = useSpeechSynthesis();
    const [submitted, setSubmitted] = useState(false);
    const [points, setPoints] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const speakCorrect = "That's right, you are correct";
    const isWrong = "Sorry, you are wrong";
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
    const handleSubmit = (param1, param2, points) => {
        const userInput = givenAns.toLowerCase();
        const correctAnswer = param1.toLowerCase();
        if (userInput === correctAnswer) {
            console.log("true");

            speak({ text: speakCorrect });
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: true,
            }));
            setPoints((prevPoints) => prevPoints + points);
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
                    <h3>Level : {questionsData[currentQuestionIndex]?.difficulty}, Points : {questionsData[currentQuestionIndex]?.points}</h3>

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
                                    disabled={submitted}
                                />
                                {correct[questionsData[currentQuestionIndex]?.id] === true && (
                                    <div className="rw">You are right!!</div>
                                )}
                                {correct[questionsData[currentQuestionIndex]?.id] === false && (
                                    <div className="rw1">Sorry, you are wrong, the correct answer is {questionsData[currentQuestionIndex]?.answer}</div>
                                )}
                                <button className="submit-button" onClick={() => handleSubmit(questionsData[currentQuestionIndex]?.answer, questionsData[currentQuestionIndex]?.id, questionsData[currentQuestionIndex]?.points)} disabled={submitted}>
                                    Submit
                                </button>
                                <button className="next-button" onClick={handleNextQuestion} disabled={!submitted}>
                                    Next Question
                                </button>

                                <h4 className="score">Points: {points}</h4>
                            </>
                        ) : (
                            <div className="quiz-over-message">
                                Quiz Over! Your total points: {points}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Oneword