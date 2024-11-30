import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const question = data[index];

  const checkAns = (option) => {
    if (!lock) {
      setSelectedOption(option);
      setLock(true);
      if (question.ans === option) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
        setLock(false);
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setSelectedOption(null);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            {[1, 2, 3, 4].map((option) => (
              <li
                key={option}
                className={`${
                  selectedOption === option
                    ? question.ans === option
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => checkAns(option)}
              >
                {question[`option${option}`]}
              </li>
            ))}
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;

