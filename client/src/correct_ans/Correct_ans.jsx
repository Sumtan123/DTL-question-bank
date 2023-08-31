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
	const [attempt,isAttempted]=useState(null);
	const text = "Choose the odd one out";
	const speakCorrect = "That's right you are correct";
	const isWrong = "Sorry you are wrong kid! try again";
	const handleOnClick = () => {
		speak({ text:text  });
	};
	const handleOptionChange = (event) => {
		console.log(event.target.value);
		selectedOption(event.target.value);
	};
	const handleSubmit = (param1,param2) => {
		
		if (param1 === option)
		{	console.log("true");
		speak({ text: speakCorrect});
		isCorrect(prevCorrect => ({
			...prevCorrect,
			[param2]: true,
		  }));
			

	}
		else if(option===null){
			return
		}
		else
			{console.log("false");
			isCorrect(prevCorrect => ({
				...prevCorrect,
				[param2]: false,
			  }));
			speak({ text:isWrong});}
	};
	
	return (
		<>
		<div className='topBar'><h1>Educate</h1></div>
			{questions.map(question => (
				<div className='correct'>
					<div className="left">
						<div className="talk" onClick={handleOnClick}>
							<div className="questiona">
								Choose the Odd one Out!!
							</div>
						</div>
					</div>
					<div className="right">
						<form onSubmit=''className='formi'>
							<label>
								<input type="radio" value="option1" name="ans" onChange={handleOptionChange} />
								{question.option1}
								<div><img src={question?.option1_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<br />
							<label>
								<input type="radio" value="option2" name='ans' onChange={handleOptionChange} />
								{question.option2}
								<div><img src={question?.option2_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<br />
							<label>
								<input type="radio" value="option3" name='ans' onChange={handleOptionChange} />
								{question.option3}
								<div><img src={question?.option3_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<label>
								<input type="radio" value="option4" name='ans' onChange={handleOptionChange} />
								{question.option4}
								<div><img src={question?.option4_url} alt="" style={{ width: "50%"}} /></div>
							</label>
							<Button variant="warning" onClick={() => handleSubmit(question.answer,question.id)}>Submit</Button>
							
						</form>
						{/*<Button variant='warning' onClick={handleDisplay(question.answer,question.reason)}>Check Reason</Button> */}
						{(correct[question.id]===true) && <div style={{display:"flex",margin:"10px", justifyContent:"center",alignItems:'center',fontSize:'1.5rem', color:'black',backgroundColor:"lightgreen"}}>You are right kid<br/>{question.reason}</div>}
						{(correct[question.id]===false) && <div style={{display:"flex",margin:"10px", justifyContent:"center",alignItems:'center',fontSize:'1.5rem', color:'black',backgroundColor:"lightgreen"}}>You are wrong kid Try again</div>}
					</div>
				</div>
			))}
		</>
	);
};

export default Correct_ans;