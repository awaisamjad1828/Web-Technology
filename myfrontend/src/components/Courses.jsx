import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Courses.css'; // Import your CSS file

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/courses/');
                setCourses(response.data);
                setFilteredCourses(response.data); // Initialize with all courses
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const filterCourses = (category) => {
        if (category === 'all') {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course => course.category === category);
            setFilteredCourses(filtered);
        }
    };

    return (
        <div>
            <div className="categories text-center btn-cat">
                <button onClick={() => filterCourses('all')}>All</button>
                <button onClick={() => filterCourses('Web Development')}>Web Development</button>
                <button onClick={() => filterCourses('Programming Language')}>Programming Language</button>
                <button onClick={() => filterCourses('Other')}>Other</button>
            </div>

            <div className="container" id="courseContainer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {filteredCourses.map(course => (
                    <div key={course.id} className="card">
                        <img src={course.image} className="card-img-top" alt={course.title} />
                        <div className="card-body">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">{course.description}</p>
                            <a href={course.link} className="btn btn-primary">Watch Now</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
