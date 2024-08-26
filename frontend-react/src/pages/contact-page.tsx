import { useEffect } from "react";

import "./css/contact-page.css";

function ContactPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const myEmail = <a href="mailto:tanakan@oregonstate.edu" className="email-link">tanakan@oregonstate.edu</a>;

    function updateCounter() {
        const textarea = document.getElementById('contact-message-input') as HTMLInputElement;
        const counter = document.getElementById('char-counter') as HTMLElement;
        const numWords = textarea.value.length.toString();
        counter.textContent = numWords;
    }

    function formSubmit(e) {
        e.preventDefault();
        const form = document.getElementById('contact-form') as HTMLFormElement;
        const arr =  form.elements as HTMLFormControlsCollection
        for (const input of arr) {
            const ele = input as HTMLInputElement;
            console.log(ele.value)
            // need to submit post to do email thing
        }
    }

    return (
        <>
            <div className="contact-content">

                <h1 className="page-title center-text">Get in Touch!</h1>
                <p className="page-text contact-subtitle center-text">Email me at {myEmail} or fill out the form below.</p>

                <form className="contact-form" id="contact-form" onSubmit={formSubmit}>

                    <div className="contact-input-container">
                        <label htmlFor="contact-name-input" className="page-text contact-label"><p>Full Name</p></label>
                        <input 
                            type="text" 
                            name="contact-name" 
                            id="contact-name-input" 
                            placeholder="Ex. John Stones" 
                            maxLength={30}
                        />
                    </div>

                    <div className="contact-input-container">
                        <label htmlFor="contact-email-input" className="page-text contact-label"><p>Email</p></label>
                        <input 
                            type="text" 
                            name="contact-email" 
                            id="contact-email-input"
                            placeholder="Ex. johnstones@email.com"
                            maxLength={50}
                        />
                    </div>

                    <div className="contact-input-container">
                        <label htmlFor="contact-message-input" className="page-text contact-label"><p>Message</p></label>
                        <textarea 
                            name="contact-message" 
                            id="contact-message-input" 
                            placeholder="Please enter your message in 500 characters or less"
                            maxLength={500}
                            onChange={updateCounter}
                        />
                        <div className="char-counter-container">
                            <p id="char-counter">0</p>
                        </div>
                    </div>

                    <div className="contact-submit-container">
                        <button className="contact-submit-button">Submit</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default ContactPage;