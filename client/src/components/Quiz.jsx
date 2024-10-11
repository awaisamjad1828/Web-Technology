// src/components/Quiz.js

import React, { useState } from 'react';

const questions = [{
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Leo Tolstoy", "William Shakespeare", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        answer: "Mitochondria"
    }
];

const Quiz = () => {
    const [responses, setResponses] = useState(Array(questions.length).fill(""));
    const [score, setScore] = useState(null);

    const handleChange = (index, option) => {
        const newResponses = [...responses];
        newResponses[index] = option;
        setResponses(newResponses);
    };

    const handleSubmit = () => {
        const totalScore = responses.reduce((score, response, index) => {
            return response === questions[index].answer ? score + 1 : score;
        }, 0);
        setScore(totalScore);
    };

    if (score !== null) {
        return <h > Your Score: { score }
        /{questions.length}</h
        2 > ;
    }

    return ( <
        div >
        <
        h2 > Quiz < /h2> {
            questions.map((q, index) => ( <
                div key = { index } >
                <
                h4 > { q.question } < /h4> {
                    q.options.map((option) => ( <
                        div key = { option } >
                        <
                        label >
                        <
                        input type = "radio"
                        name = { `question${index}` }
                        value = { option }
                        checked = { responses[index] === option }
                        onChange = {
                            () => handleChange(index, option) }
                        /> { option } <
                        /label> <
                        /div>
                    ))
                } <
                /div>
            ))
        } <
        button onClick = { handleSubmit } > Submit < /button> <
        /div>
    );
};

export default Quiz;