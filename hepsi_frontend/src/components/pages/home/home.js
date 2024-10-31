import React from 'react';
import './home.css';

const HomePage = () => {
    return (
        <div className='homaepage'>
            <header className='header'>
                <h1>HEPSI online platfrom</h1>
                <nav>
                    <a href="#courses">Courses</a>
                    <a href="#about">About us</a>
                    <a href="#contact">Contacts</a>
                    <a href="#login">Login</a>
                </nav>
            </header>
            <section className='hero'>
                <h2>Start learning programming</h2>
                <button className='cta-button'> start education</button>
                <button className='cta-button secondary'>See more</button>
            </section>
            <section id='courses' className='courses'>
                <h2>Our courses</h2>
                <div className='course-card'>Python courses</div>
                <div className='course-card'>Docker</div>
                <div className='course-card'>React</div>
            </section>
            <footer className='footer'>
            <p>
                 <a href="https://github.com/antago7" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
            </footer>
        </div>
    );
}

export default HomePage;