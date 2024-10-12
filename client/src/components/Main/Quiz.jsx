import React, { useState } from 'react';
import Nav from './Navbar';

const Quiz = () => {
  // State to hold answers and score
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Quiz questions
  const questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correct: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correct: 'Mars',
    },
    {
      id: 3,
      question: 'What is the largest ocean on Earth?',
      options: ['Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correct: 'Pacific Ocean',
    },
    {
      id: 4,
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'Jane Austen'],
      correct: 'William Shakespeare',
    },
    {
      id: 5,
      question: 'What is the chemical symbol for water?',
      options: ['O2', 'CO2', 'H2O', 'NaCl'],
      correct: 'H2O',
    }
  ];

  // Handle answer selection
  const handleAnswer = (questionId, selectedAnswer) => {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  };

  // Calculate score on submission
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (

    <div style={{ padding: '20px' }}>
          <Nav/>
      <h1>Quiz</h1>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px' }}>
          <h4>{q.question}</h4>
          {q.options.map((option) => (
            <label key={option} style={{ display: 'block', margin: '5px 0' }}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                onChange={() => handleAnswer(q.id, option)}
                checked={answers[q.id] === option}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>

      {score !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Your score: {score} / {questions.length}</h3>
        </div>
      )}
    </div>
  );
};

export default Quiz;
