import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft:'200px',marginRight:'220px'}}>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src="https://reciprocity.com/wp-content/uploads/2022/01/faq_what-is-information-security-risk_featured-img_730x270_small.jpg" />
        <Card.Body>
          <Card.Title>Information Security</Card.Title>
          <Card.Text>
            Ms Fatima Shahzadi <br />
            Instructor
          </Card.Text>
          <Button variant="primary">Click Here</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s" />
        <Card.Body>
          <Card.Title>Artificial Intelligence</Card.Title>
          <Card.Text>
            Ms Rabia Sana <br />
            Instructor
          </Card.Text>
          <Button variant="primary">Click Here</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src="data:image/jpeg;base64,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" />
        <Card.Body>
          <Card.Title>Software Engineering</Card.Title>
          <Card.Text>
            Dr. Yaseen <br />
            Instructor
          </Card.Text>
          <Button variant="primary">Click Here</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src="https://www.techtarget.com/rms/onlineimages/app_arch-software_dev_lifecycle-f_mobile.png" />
        <Card.Body>
          <Card.Title>Professional Practice in SE</Card.Title>
          <Card.Text>
            Ms Rabia Sana<br />
            Instructor
          </Card.Text>
          <Button variant="primary">Click Here</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLIOZ2kk_6rNYpOMnc16YycTDjUBYuTD0BQ&s" />
        <Card.Body>
          <Card.Title>Web Techonology</Card.Title>
          <Card.Text>
            Ms Farwa <br />
            Instructor
          </Card.Text>
          <Button variant="primary">Click Here</Button>
        </Card.Body>
      </Card>

    </div>
  );
}

export default BasicExample;