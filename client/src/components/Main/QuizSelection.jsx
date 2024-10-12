// src/components/QuizSelection.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./styles.module.css";
const books = [
  {
    title: "Information Security",
    instructor: "Ms Fatima Shahzadi",
    imgSrc:
      "https://reciprocity.com/wp-content/uploads/2022/01/faq_what-is-information-security-risk_featured-img_730x270_small.jpg",
    quizzes: [
      {
        id: 1,
        startTime: new Date("2024-10-10T09:00:00"),
        endTime: new Date("2024-10-15T18:00:00"),
      },
      {
        id: 2,
        startTime: new Date("2024-10-20T09:00:00"),
        endTime: new Date("2024-10-25T18:00:00"),
      },
    ],
  },
  {
    title: "Artificial Intelligence",
    instructor: "Ms Rabia Sana",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s",
    pdf: "/crypo&netbywilliam6th.pdf",
    quizzes: [
      {
        id: 1,
        startTime: new Date("2024-11-10T09:00:00"),
        endTime: new Date("2024-11-15T18:00:00"),
      },
      {
        id: 2,
        startTime: new Date("2024-11-20T09:00:00"),
        endTime: new Date("2024-11-25T18:00:00"),
      },
    ],
  },
  {
    title: "Software Engineering",
    instructor: "Dr. Yaseen",
    imgSrc:
      "https://images.credly.com/images/1e3e36a0-ab85-40f7-802e-006e90211db6/Software_Engineering_GVSU_Badge.png", // Add an image source if available
    pdf: "/crypo&netbywilliam6th.pdf",
    quizzes: [
      {
        id: 1,
        startTime: new Date("2024-12-10T09:00:00"),
        endTime: new Date("2024-12-15T18:00:00"),
      },
      {
        id: 2,
        startTime: new Date("2024-12-20T09:00:00"),
        endTime: new Date("2024-12-25T18:00:00"),
      },
    ],
  },
  {
    title: "Professional Practice in SE",
    instructor: "Ms Rabia Sana",
    imgSrc:
      "https://www.techtarget.com/rms/onlineimages/app_arch-software_dev_lifecycle-f_mobile.png",
    pdf: "/crypo&netbywilliam6th.pdf",
    quizzes: [
      {
        id: 1,
        startTime: new Date("2025-01-10T09:00:00"),
        endTime: new Date("2025-01-15T18:00:00"),
      },
      {
        id: 2,
        startTime: new Date("2025-01-20T09:00:00"),
        endTime: new Date("2025-01-25T18:00:00"),
      },
    ],
  },
  {
    title: "Web Technology",
    instructor: "Ms Farwa",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLIOZ2kk_6rNYpOMnc16YycTDjUBYuTD0BQ&s",
    pdf: "/crypo&netbywilliam6th.pdf",
    quizzes: [
      {
        id: 1,
        startTime: new Date("2025-02-10T09:00:00"),
        endTime: new Date("2025-02-15T18:00:00"),
      },
      {
        id: 2,
        startTime: new Date("2025-02-20T09:00:00"),
        endTime: new Date("2025-02-25T18:00:00"),
      },
    ],
  },
];

function QuizSelection() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const currentTime = new Date();

  const selectedBook = books.find((book) => book.title === subject);

  if (!selectedBook) {
    return <h2>Subject not found</h2>;
  }

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${subject}/${quizId}`);
  };

  return (
    <div className={styles.main_container1} style={{ textAlign: "center" }}>
      <Navbar />
      <h1>{subject} - Select a Quiz</h1>
      {selectedBook.quizzes.map((quiz) => (
        <div key={quiz.id}>
          <button
            onClick={() => handleQuizClick(quiz.id)}
            disabled={
              currentTime < quiz.startTime || currentTime > quiz.endTime
            }
            style={{ padding: "10px 20px", margin: "10px" }}
          >
            Quiz {quiz.id} - Available from {quiz.startTime.toLocaleString()} to{" "}
            {quiz.endTime.toLocaleString()}
          </button>
        </div>
      ))}
    </div>
  );
}

export default QuizSelection;
