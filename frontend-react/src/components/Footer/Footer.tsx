import "./Footer.css"

function Footer() {
    return (
        <>
            <footer>
                <div className="footer-inner-container">
                    <div className="footer-grid">
                        <div className="footer-left">
                            <img src="/favicon.webp" alt="Brand logo spelling OSU" className="header-logo"></img>
                        </div>
                        <div className="footer-right">
                            <p className="navbar-brand">OSU Grade Distributions</p>
                            <p className="copyright">&copy; 2024 Nicholas Tanaka</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
  }
  
  export default Footer;