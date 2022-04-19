import React from 'react'
import CardService from './CardService'
import service1 from "./../../assets/services/service1.svg"
import service2 from "./../../assets/services/service2.svg"
import service3 from "./../../assets/services/service3.svg"

const Features = () => {
  return (
    <section className="services" >
    <div className="header-services">
        <h2>The features we provide</h2>
    </div>
    <div className="container-services">
        <div className="grid-services">
        
                <CardService
                    id="1"
                    icon= {service1}
                    title= "Keep the chat & team projects all in one place"
                    description="Save time and avoid the hassle of searching for team mates with student.connect's messaging and activity feed services"
                />
                 <CardService
                    id="2"
                    icon= {service2}
                    title= "Completely free for students"
                    description="If your university is registered, you can create an account and start chatting!"
                />
                <CardService
                    id="3"
                    icon= {service3}
                    title= "Your ultimate tool for student life"
                    description="Help others or let others help you, student.connect takes away that student stress"
                />
    
        </div>
    </div>
    </section>
  )
}

export default Features