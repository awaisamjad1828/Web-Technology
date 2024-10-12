// src/components/QuizWindow.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './styles.module.css';
const books = [
    {
        title: 'Information Security',
        quizzes: [
            {
                id: 1,
                questions: [
                    { question: 'What is a firewall?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is encryption?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is a VPN?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is a phishing attack?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is a DDoS attack?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is a malware attack?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
            {
                id: 2,
                questions: [
                    { question: 'What is access control?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is risk assessment?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is vulnerability scanning?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is incident response?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is identity and access management (IAM)?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is compliance?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
        ],
    },
    {
        title: "Artificial Intelligence",
        quizzes: [
            {
                id: 1,
                questions: [
                    { question: 'What is machine learning?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is deep learning?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is neural network?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is natural language processing?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is computer vision?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is robotics?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
            {
                id: 2,
                questions: [
                    { question: 'What is supervised learning?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is unsupervised learning?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is reinforcement learning?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is artificial neural network?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is genetic algorithm?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is fuzzy logic?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
        ],
    },
    {
        title: "Software Engineering",
        quizzes: [
            {
                id: 1,
                questions: [
                    { question: 'What is software development lifecycle?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is agile methodology?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is waterfall model?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is object-oriented programming?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is data structures?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is algorithms?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
            {
                id: 2,
                questions: [
                    { question: 'What is software testing?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is software quality assurance?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is software design patterns?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is software architecture?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is software maintenance?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is software configuration management?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
        ],
    },
    {
        title: "Professional Practice in SE",
        quizzes: [
            {
                id: 1,
                questions: [
                    { question: 'What is ethics in software engineering?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is intellectual property?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is software licensing?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is software engineering profession?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is project management?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is quality assurance?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
            {
                id: 2,
                questions: [
                    { question: 'What is software engineering ethics?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is professional responsibility?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is software engineering code of ethics?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is software engineering standards?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is software engineering education?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is software engineering research?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
        ],
    },
    {
        title: "Web Technology",
        quizzes: [
            {
                id: 1,
                questions: [
                    { question: 'What is HTML?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is CSS?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is JavaScript?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is a responsive design?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is a web framework?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is SEO?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
            {
                id: 2,
                questions: [
                    { question: 'What is a web server?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 'Option 1' },
                    { question: 'What is HTTP?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 'Option B' },
                    { question: 'What is REST API?', options: ['Option E', 'Option F', 'Option G', 'Option H'], correct: 'Option F' },
                    { question: 'What is Ajax?', options: ['Option I', 'Option J', 'Option K', 'Option L'], correct: 'Option K' },
                    { question: 'What is a database in web development?', options: ['Option M', 'Option N', 'Option O', 'Option P'], correct: 'Option N' },
                    { question: 'What is a web browser?', options: ['Option Q', 'Option R', 'Option S', 'Option T'], correct: 'Option R' },
                ],
            },
        ],
    },
];

function QuizWindow() {
    const { subject, quizId } = useParams();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const selectedBook = books.find((book) => book.title === subject);
    const selectedQuiz = selectedBook.quizzes.find((quiz) => quiz.id === parseInt(quizId));

    const handleAnswer = (questionIndex, selectedAnswer) => {
        setAnswers({ ...answers, [questionIndex]: selectedAnswer });
    };

    const handleSubmit = () => {
        let newScore = 0;
        selectedQuiz.questions.forEach((question, index) => {
            if (answers[index] === question.correct) {
                newScore += 1;
            }
        });
        setScore(newScore);
    };

    return (
        <div className={styles.main_container1} style={{  textAlign: 'center' }}>
                <Navbar/>
            <h1>{subject} - Quiz {quizId}</h1>
            {selectedQuiz.questions.map((q, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h4>{q.question}</h4>
                    {q.options.map((option) => (
                        <label key={option} style={{ display: 'block', margin: '5px 0' }}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                onChange={() => handleAnswer(index, option)}
                                checked={answers[index] === option}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>

            {score !== null && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Your score: {score} / {selectedQuiz.questions.length}</h3>
                </div>
            )}
        </div>
    );
}

export default QuizWindow;
