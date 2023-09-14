import React, { useState } from 'react';
import './correct_ans.scss';
import questions from '../../questions/correct_ans.json';
import { useSpeechSynthesis } from 'react-speech-kit';
//import crow from '../images/crow.png';
import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';
const Correct_ans = () => {
	const [option, selectedOption] = useState(null);
	const { speak } = useSpeechSynthesis();
	const [correct,isCorrect]= useState({});
	const [points, setPoints] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const text = "Choose the odd one out";
	const speakCorrect = "That's right you are correct";
	const isWrong = "Sorry you are wrong!";
	const handleOnClick = () => {
		speak({ text:text  });
	};
	const handleOptionChange = (event) => {
		console.log(event.target.value);
		selectedOption(event.target.value);
	};
	const handleNextQuestion = () => {
        if (submitted) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            
			selectedOption(null);
            isCorrect({});
            setSubmitted(false);
        }
    };
	const handleSubmit = (param1,param2,param3) => {
		setSubmitted(true);
		if (param1 === option)
		{	console.log("true");
		
		speak({ text: speakCorrect});
		isCorrect(prevCorrect => ({
			...prevCorrect,
			[param2]: true,
		  }));
		  setPoints((prevPoints) => prevPoints + param3);
			

	}
		else if(option===null){
			return
		}
		else
			{
				console.log("false");
			
			isCorrect(prevCorrect => ({
				...prevCorrect,
				[param2]: false,
			  }));
			speak({ text:isWrong});
		}
			
	};
	
	return (
		<>
		<div className='topBar'><h1>Educate</h1></div>
		{currentQuestionIndex < questions.length ? (
				<div className='correct'>
					<div className="left">
						<div className="talk" onClick={handleOnClick}>
							<div className="questiona">
								Choose the Odd one Out!!
							</div>
						</div>
					</div>
					<div className="right">
						<div className="formi">
							<label>
								<input type="radio" value="option1" name="ans" onChange={handleOptionChange} />
								{questions[currentQuestionIndex].option1}
								<div><img src={questions[currentQuestionIndex]?.option1_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<br />
							<label>
								<input type="radio" value="option2" name='ans' onChange={handleOptionChange} />
								{questions[currentQuestionIndex].option2}
								<div><img src={questions[currentQuestionIndex]?.option2_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<br />
							<label>
								<input type="radio" value="option3" name='ans' onChange={handleOptionChange} />
								{questions[currentQuestionIndex].option3}
								<div><img src={questions[currentQuestionIndex]?.option3_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<label>
								<input type="radio" value="option4" name='ans' onChange={handleOptionChange} />
								{questions[currentQuestionIndex].option4}
								<div><img src={questions[currentQuestionIndex]?.option4_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<button className='normal-button' onClick={() => handleSubmit(questions[currentQuestionIndex]?.answer,questions[currentQuestionIndex]?.id,questions[currentQuestionIndex]?.points) } disabled={submitted}>Submit</button>
							<button className='normal-next' onClick={handleNextQuestion} disabled={!submitted}>
                                    Next Question
                                </button>
								
							{/*<Button variant='warning' onClick={handleDisplay(question.answer,question.reason)}>Check Reason</Button> */}
							{(correct[questions[currentQuestionIndex]?.id]===true) && <div style={{display:"flex",margin:"10px", justifyContent:"center",alignItems:'center',fontSize:'1.5rem', color:'black',backgroundColor:"lightgreen"}}>You are right!<br/>{questions[currentQuestionIndex].reason}</div>}
							{(correct[questions[currentQuestionIndex]?.id]===false) && <div style={{display:"flex",margin:"10px", justifyContent:"center",alignItems:'center',fontSize:'1.5rem', color:'black',backgroundColor:"red"}}>Sorry, you are wrong!</div>}
						</div>
						<h4 className="score">Points: {points}</h4>
					</div>
				</div>):(
					<div className="quiz-over-message">
                                Quiz Over!
                            </div>
				)}
			
		</>
	);
};

export default Correct_ans;