import React from 'react'
import './oneword.css'
import questionsData from '../../questions/one_word.json'
const Oneword = () => {
    return (
        <>
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
                            />
                            <button className="submit-button">Submit</button>
                        </div>
                    </div>
                </>
            ))}
        </>
    )
}

export default Oneword