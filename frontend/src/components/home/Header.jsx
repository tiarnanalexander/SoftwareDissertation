import React from 'react'

import hero from "./../../assets/hero.svg";


const Header = () => {
    return (
        <section className="hero-section">
        <div className="container-hero">

            <div className="content-hero">

                <div className="left-side">
                    <h1>A student platform helping make student-life easier</h1>
                    <p>Finding or communicating with team mates or course mates has always a challenge. Thats why we have created student.connect, an all-in-one student package</p>
                    <form>
                        <div className="form-group">
                            <button className='explore'>Explore</button>
                            <button className='learn'>Learn more</button>
                        </div>
                    </form>
                </div>


                <div className="right-side">
                    <img src={hero} layout="fill" width='521'/>
                </div>

            </div>

        </div>
    </section>
    )
}

export default Header
