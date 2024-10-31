import React from 'react';
import './home.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1 className="logo">HEPSI Online Platform</h1>
                <nav className="nav">
                    <a href="#courses">Courses</a>
                    <a href="#contacts">Contacts</a>
                </nav>
            </header>

            <main className="main-content">
                <section className="intro-section">
                    <h2>Start Learning Programming</h2>
                    <p>Enhance your skills and dive into the world of coding with our specialized courses.</p>
                    <div className="button-group">
                        <button className="btn primary-btn">Start Education</button>
                        <button className="btn secondary-btn">See More</button>
                    </div>
                </section>

                <section className="courses-section" id="courses">
                    <h3>Our Courses</h3>
                    <div className="courses">
                        <div className="course-card">Python Courses</div>
                        <div className="course-card">Docker</div>
                        <div className="course-card">React</div>
                    </div>
                </section>

                <footer className="footer" id="contacts">

                    
                    <p>
                        <a href="https://github.com/antago7" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default HomePage;