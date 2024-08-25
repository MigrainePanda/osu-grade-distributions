import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
   
    return (
        <>
            <header className="navbar-container">
                <div className="navbar-wrapper">
                    <NavLink className="navbar-brand" to="/">
                        <img src="/favicon.png" className="header-logo"></img>
                    </NavLink>
                    <nav className="navbar-menu">
                        <NavLink className="navbar-menu-items" to="/">Home</NavLink>
                        <NavLink className="navbar-menu-items" to="/courses">Courses</NavLink>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;