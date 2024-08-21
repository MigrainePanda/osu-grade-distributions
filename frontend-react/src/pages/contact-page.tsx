
import "./css/contact-page.css";

function ContactPage() {

    const myEmail = <a href="mailto:tanakan@oregonstate.edu" className="email-link">tanakan@oregonstate.edu</a>;

    return (
        <>
            <div className="center-text">
                <h1>Get in Touch!</h1>
                <p>Email me at {myEmail} or fill out the form below.</p>
            </div>

            <form className="contact-form">
                <div className="contact-first-div">
                    <div>
                        <label className="first-label">First Name:</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label className="last-label">Last Name:</label>
                        <input type="text"></input>
                    </div>
                </div>
                <div className="center-div">
                    <label>Subject:</label>
                    <input type="text"></input>
                </div>
                <div className="center-div">
                    <label>Message:</label>
                    <input type="text"></input>
                </div>
                <div className="center-div">
                    <button>Submit</button>
                </div>
            </form>
        </>
    )
}

export default ContactPage;