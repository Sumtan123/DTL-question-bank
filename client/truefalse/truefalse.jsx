import React, { useState } from 'react';
import './truefalse.css'
import questionsData from '../questions/true_false.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Truefalse = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState({});
    const { speak } = useSpeechSynthesis();
    const speakCorrect = "That's right you are correct";
	const isWrong = "Sorry you are wrong, try again";
    const handleOptionChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (param1,param2) => {
        if (param1 === selectedOption) {
            console.log("true");
            
            speak({ text: speakCorrect});
            setIsCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: true,
              }));
        }
            else if(selectedOption===null){
                return 
            } 
        
        else {
            console.log("false");
            
            speak({ text:isWrong});
            setIsCorrect(prevCorrect => ({
                ...prevCorrect,
                [param2]: false,
              }));
        }
    };
    return (
        <>
            <div className="topBar"><h1>Educate</h1></div>
            <div className="truefalsebg">
                {questionsData.map((item) => (
                    <>
                        <div className="section">
                            <h3>Section 3 - True or False</h3>
                            <h3>Level : {item.difficulty}</h3>
                        </div>
                        <div className="template1">
                            <div key={item.id}>
                                <h3>{item.question}</h3>
                                <label className='label1'>
                                    <input type="radio" value="True" name="ans" onChange={handleOptionChange} />
                                    True
                                </label>
                                <br />
                                <label className='label1'>
                                    <input type="radio" value="False" name="ans" onChange={handleOptionChange} />
                                    False
                                </label>
                                <button className="submit-button" onClick={() => handleSubmit(item.answer,item.id)}>Submit</button>
                                {isCorrect[item.id] === true && <div className="rw">You are right!! </div>}
                                {isCorrect[item.id] === false && <div className="rw">Sorry You are wrong, try again</div>}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Truefalse