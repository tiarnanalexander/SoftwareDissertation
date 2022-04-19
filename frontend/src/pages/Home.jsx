import React from "react";
import { Navbar } from '../components';
import { Header, Features, Contact } from '../components/home';




export default function Landing() {
    return (
        <>
            <div className="landing-body">
                <Navbar />
                <Header />
                <Features />
                <Contact />
            </div>
        </>
    )
}

