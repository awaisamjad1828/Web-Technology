import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const books = [
  {
    title: "Information Security",
    instructor: "Ms Fatima Shahzadi",
    imgSrc: "https://reciprocity.com/wp-content/uploads/2022/01/faq_what-is-information-security-risk_featured-img_730x270_small.jpg",
    pdf: "/crypo&netbywilliam6th.pdf"
  },
  {
    title: "Artificial Intelligence",
    instructor: "Ms Rabia Sana",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s",
    pdf: "/crypo&netbywilliam6th.pdf"
  },
  {
    title: "Software Engineering",
    instructor: "Dr. Yaseen",
    imgSrc: "https://images.credly.com/images/1e3e36a0-ab85-40f7-802e-006e90211db6/Software_Engineering_GVSU_Badge.png", // Add an image source if available
    pdf: "/crypo&netbywilliam6th.pdf"
  },
  {
    title: "Professional Practice in SE",
    instructor: "Ms Rabia Sana",
    imgSrc: "https://www.techtarget.com/rms/onlineimages/app_arch-software_dev_lifecycle-f_mobile.png",
    pdf: "/crypo&netbywilliam6th.pdf"
  },
  {
    title: "Web Technology",
    instructor: "Ms Farwa",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLIOZ2kk_6rNYpOMnc16YycTDjUBYuTD0BQ&s",
    pdf: "/crypo&netbywilliam6th.pdf"
  }
];

function BasicExample() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {filteredBooks.map((book, index) => (
          <Card key={index} style={{ width: '18rem', height: '24rem', margin: '10px' }}>
            {book.imgSrc && (
              <Card.Img style={{ width: '100%', height: '170px' }} variant="top" src={book.imgSrc} />
            )}
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  {book.instructor}
                </Card.Text>
              </div>
              <div>
                <Button variant="primary" style={{ display: 'block', marginBottom: '10px' }} onClick={() => {
                  const link = document.createElement('a');
                  link.href = book.pdf;
                  link.download = book.pdf.split('/').pop(); // Extracts the file name
                  link.click();
                }}>
                  Download Book
                </Button>
                <Button variant="primary">Quiz</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BasicExample;
