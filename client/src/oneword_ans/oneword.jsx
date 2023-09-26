import React, { useState, useEffect } from 'react'
import './oneword.css'
import questionsData from '../../questions/one_word.json'
//import { useSpeechSynthesis } from 'react-speech-kit';
const Oneword = () => {
    const [givenAns, setGivenAns] = useState('');
    const [correct, setCorrect] = useState({});
    //const { speak } = useSpeechSynthesis();
    const [submitted, setSubmitted] = useState(false);
    const [points, setPoints] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showThumbsUp, setShowThumbsUp] = useState(false);
    const [showThumbsDown, setShowThumbsDown] = useState(false);
    const [playClappingMusic, setPlayClappingMusic] = useState(false);
    const [playNegativeMusic, setPlayNegativeMusic] = useState(false);
    const [playRightMusic, setPlayRightMusic] = useState(false);
    const [playWrongMusic, setPlayWrongMusic] = useState(false);
    //const speakCorrect = "That's right, you are correct";
    //const isWrong = "Sorry, you are wrong";
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
    const clappingAudio = new Audio('clapping.mp3');
    const wrong = new Audio('negative.mp3')
    const correctgirl = new Audio('ThatsRightUAreCorrect.mp3')
    const wronggirl = new Audio('SorryUAreWrong.mp3')
    useEffect(() => {
        if (playClappingMusic) {
            clappingAudio.play();
            setTimeout(() => {
                clappingAudio.pause();
                clappingAudio.currentTime = 0;
                setPlayClappingMusic(false);
            }, 2000);
        }
    }, [playClappingMusic]);

    useEffect(() => {
        if (playNegativeMusic) {
            wrong.play();
            setTimeout(() => {
                wrong.pause();
                wrong.currentTime = 0;
                setPlayNegativeMusic(false);
            }, 2000);
        }
    }, [playNegativeMusic]);

    useEffect(() => {
        if (playRightMusic) {
            correctgirl.play();
            setTimeout(() => {
                correctgirl.pause();
                correctgirl.currentTime = 0;
                setPlayRightMusic(false);
            }, 2000);
        }
    }, [playRightMusic]);

    useEffect(() => {
        if (playWrongMusic) {
            wronggirl.play();
            setTimeout(() => {
                wronggirl.pause();
                wronggirl.currentTime = 0;
                setPlayWrongMusic(false);
            }, 2000);
        }
    }, [playWrongMusic]);

    const handleSubmit = (param1, param2, points) => {
        const userInput = givenAns.toLowerCase();
        const correctAnswer = param1.toLowerCase();
        if (userInput === correctAnswer) {
            console.log("true");

            //speak({ text: speakCorrect });
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: true,
            }));
            setPoints((prevPoints) => prevPoints + points);
            setShowThumbsUp(true);
            setTimeout(() => {
                setShowThumbsUp(false);
            }, 2000); 
            setPlayClappingMusic(true);
            setPlayRightMusic(true);        
        }
        else if (givenAns === '') {
            return
        }
        else {
            console.log('false');

            //speak({ text: isWrong });
            setCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: false,
            }));
            setShowThumbsDown(true);
            setTimeout(() => {
                setShowThumbsDown(false);
            }, 2000); 
            setPlayNegativeMusic(true);
            setPlayWrongMusic(true);
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
                                <img className='trophy' src='https://img.freepik.com/free-vector/gold-cup-illustration_1284-17139.jpg?size=626&ext=jpg&ga=GA1.2.1873050670.1691914218&semt=ais' />
                                <h5>Quiz Over! Your total points: {points}</h5>
                            </div>
                        )}
                        {showThumbsUp && (
                            <div className="thumbs-up-animation">
                                <span className="thumbs-up-icon" role="img" aria-label="Thumbs Up">
                                    👍
                                </span>
                            </div>
                        )}
                        {showThumbsDown && (
                            <div className="thumbs-up-animation">
                                <span className="thumbs-up-icon" role="img" aria-label="Thumbs Up">
                                👎
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Oneword