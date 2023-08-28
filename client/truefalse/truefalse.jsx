import React, { useState } from 'react';
import './truefalse.css'
import questionsData from '../questions/true_false.json'
import { useSpeechSynthesis } from 'react-speech-kit';
const Truefalse = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const { speak } = useSpeechSynthesis();
    const speakCorrect = "That's right you are correct";
	const isWrong = "Sorry you are wrong, try again";
    const handleOptionChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (param) => {
        if (param === selectedOption) {
            console.log("true");
            setIsCorrect(true);
            speak({ text: speakCorrect});
        } else {
            console.log("false");
            setIsCorrect(false);
            speak({ text:isWrong});
        }
    };
    return (
        <>
            <div className="topBar"><h1>Educate</h1></div>
            <div className="truefalsebg">
                {questionsData.map((item) => (
                    <>
                        <div className="section">
                            <h3>True or False</h3>
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
                                <button className="submit-button" onClick={() => handleSubmit(item.answer)}>Submit</button>
                                {isCorrect === true && <div className="rw">You are right!!</div>}
                                {isCorrect === false && <div className="rw">Sorry You are wrong, try again</div>}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Truefalse