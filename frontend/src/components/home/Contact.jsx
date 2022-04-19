import React, {useState} from 'react'

const Contact = () => {
    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
          name: name.value,
          email: email.value,
          message: message.value,
        };
        let response = await fetch("https://studentconnectlive.herokuapp.com/auth/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
    
      };





    return (
        <section className="contact">
            <div className="contact-management">
                <form className="form-contact" onSubmit={handleSubmit}>
                    <div className="content-left-contact">
                        <h1>Contact Form</h1>
                        <p> If you need to chat to our team, send us a message telling us what you'd like to talk about and one of our staff will reach out to you and see if we can help. If you have forgotten your password please use this form</p>
                    </div>
                    <div className="content-right-contact">
                        <div className='name-contact'>
                            <label htmlFor="fullName"> Full Name </label>
                            <input
                                            name="fullName"
                                            type="text"
                                            id="name"
                                            placeholder="Your Full Name"
                                            required
                                        />

                        </div>
                        <div className='name-contact'>
                        <label htmlFor="email"> Email </label>
                            <input
                                            name="email"
                                            type="text"
                                            id="email"
                                            placeholder="Your Email"
                                            required
                                        />
                        </div>
                        <div className='name-contact'>
                        <label htmlFor="subject"> Subject </label>
                            <textarea
                                            name="subject"
                                            type="text"
                                            id="message"
                                            placeholder="Your message"
                                            required
                                        />
                        </div>
                        <div className='button-contact'>
                        <button type="submit" id="submit" className='explore margin-explore'>{status}</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact