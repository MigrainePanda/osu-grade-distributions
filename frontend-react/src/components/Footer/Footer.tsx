import { NavLink } from "react-router-dom";
import "./Footer.css"

function Footer() {
    return (
        <>
            <footer>
                <nav className="footer-inner-container">
                    <div className="footer-inner-top">
                        <p className="navbar-brand">Dam Grades</p>
                        <div className="footer-bottom-column-items">
                            <p className="copyright">&copy; 2024 Nicholas Tanaka</p>
                        </div>
                    </div>
                    <div className="footer-inner-bottom">
                        <div className="footer-bottom-columns">
                            <div className="footer-bottom-column">
                                <p className="footer-bottom-column-title">Support</p>
                                <div className="footer-bottom-column-items">
                                    <NavLink to="/">Contact Me</NavLink>
                                </div>
                            </div>
                            <div className="footer-bottom-column">
                                <p className="footer-bottom-column-title">About</p>
                                <div className="footer-bottom-column-items">
                                    <NavLink to="/">About Me</NavLink>
                                    <NavLink to="/">Terms and Service</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>
        </>
    );
  }
  
  export default Footer;