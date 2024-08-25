import { NavLink } from "react-router-dom";
import "./Footer.css"

function Footer() {
    return (
        <>
            <footer>

                <nav className="footer-inner-container">

                    <div className="footer-inner-top">
                        <p className="navbar-brand"><img src="/favicon.png" className="footer-logo"></img>OSU Grade Distributions</p>
                        <p className="copyright">&copy; 2024 Nicholas Tanaka</p>
                    </div>

                    <div className="footer-inner-bottom">

                        <div className="footer-inner-bottom-items">
                            <p className="footer-inner-column-title">Support</p>
                            <div className="footer-inner-column-item">
                                <NavLink to="/contact">Contact Me</NavLink>
                            </div>
                        </div>
                        
                        <div className="footer-inner-bottom-items">
                            <p className="footer-inner-column-title">About</p>
                            <div className="footer-inner-column-item">
                                <NavLink to="/about">About Me</NavLink>
                            </div>
                        </div>
                        
                    </div>
                    
                </nav>
            </footer>
        </>
    );
  }
  
  export default Footer;