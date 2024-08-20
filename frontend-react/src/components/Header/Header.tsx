import { NavLink } from "react-router-dom";
import "./Header.css";

function Header(  ) {
    function handleClick(idx) {
        const navbarItems = Array.from(document.getElementsByClassName("navbar-menu-items") as HTMLCollectionOf<HTMLElement>);
        let curr;
        if (idx !== -1) {
            curr = navbarItems[idx];
        }
        for (let i = 0; i<navbarItems.length; i++) {
            if (curr && navbarItems[i] === curr) {
                curr.style.borderBottom = "1px black solid";
                continue;
            }
            navbarItems[i].style.border = "0px";
        }
    }
    
    return (
        <>
            <header className="navbar-container">
                <div className="navbar-wrapper">
                    <NavLink className="navbar-brand" to="/" onClick={() => handleClick(0)}>OSU Grade Distributions</NavLink>
                    <nav className="navbar-menu">
                        <NavLink className="navbar-menu-items" to="/" onClick={() => handleClick(0)}>Home</NavLink>
                        <NavLink className="navbar-menu-items" to="/courses" onClick={() => handleClick(1)}>Courses</NavLink>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;