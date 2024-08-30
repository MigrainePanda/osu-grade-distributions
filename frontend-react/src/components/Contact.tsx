import { useRef } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";    
import HCaptcha from "@hcaptcha/react-hcaptcha";
import PropTypes from 'prop-types';

function Contact( { setResult } ) {

    const captchaRef = useRef<HTMLDivElement>(null);
    const {register, reset, handleSubmit, setValue } = useForm();
    
    const accessKey = "c300c8ae-679f-4eb4-84e8-f91e7382a246";

    const { submit: onSubmit } = useWeb3Forms({
        access_key: accessKey,
        settings: {
        from_name: "OSU Grade Distributions",
        subject: "New Contact Message from OSU Grade Distributions",
        },
        onSuccess: (msg, data) => {
            console.log("contact success: ", msg, data)
            setResult(msg);
            reset();
        },
        onError: (msg, data) => {
            console.log("contact error: ", msg, data)
            setResult(msg);
        },
    });

    const onHCaptchaChange = (token) => {
        setValue("h-captcha-response", token);
    };

    document.getElementById('contact-message-input')?.addEventListener('input', () => updateCounter());
    function updateCounter() {
        const textarea = document.getElementById('contact-message-input') as HTMLInputElement;
        const counter = document.getElementById('char-counter') as HTMLElement;
        const numWords = textarea.value.length.toString();
        counter.textContent = numWords;
    }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <input
            type="checkbox"
            id="bot-check"
            className="hidden"
            style={{ display: "none" }}
            {...register("botcheck")}
        /> 

        <div className="contact-input-container">
            <label htmlFor="contact-name-input" className="page-text contact-label"><p>Full Name</p></label>
            <input 
                type="text"
                placeholder="John Stones"
                id="contact-name-input" 
                {...register("name", { 
                    required: "Enter your full name", 
                    maxLength: 30
                })} 
                autoComplete="on"
            />
        </div>

            <div className="contact-input-container">
                <label htmlFor="contact-email-input" className="page-text contact-label"><p>Email</p></label>
                <input 
                    type="email"
                    placeholder="johnstones@email.com"
                    id="contact-email-input" 
                    {...register("email", { 
                        required: "Enter your email", 
                        maxLength: 50
                    })} 
                    autoComplete="on"
                />
            </div>

            <div className="contact-input-container">
                <label htmlFor="contact-message-input" className="page-text contact-label"><p>Message</p></label>
                <textarea 
                    id="contact-message-input" 
                    placeholder="Please enter your message in 500 characters or less" 
                    {...register("message", { 
                        required: "Enter your message", 
                        maxLength: 50,
                    })}
                />
                <div className="char-counter-container">
                    <p id="char-counter">0</p>
                </div>
            </div>

            <div className="captcha-container" ref={captchaRef}>
                <div className="captcha-wrapper">
                    <HCaptcha
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        reCaptchaCompat={false}
                        onVerify={onHCaptchaChange}
                    />
                </div>
            </div>

            <div className="contact-submit-container">
                <button type="submit" className="contact-submit-button">Submit</button>
            </div>

        </form>
    </>
 );
}

Contact.propTypes = {
    setResult: PropTypes.func,
}

export default Contact;