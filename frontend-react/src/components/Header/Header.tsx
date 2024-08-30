import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLElement>(null);

    const handleToggle = () => {
        iconRef.current?.classList.toggle('show-icon');
        menuRef.current?.classList.toggle('show-menu');
        setIsOpen(prevOpen => !prevOpen);
    }

    const handleLink = () => {
        iconRef.current?.classList.remove('show-icon');
        menuRef.current?.classList.remove('show-menu');
        setIsOpen(false);
    }
    
    function disableScroll() {
        document.body.classList.add('no-scroll');
    }

    function enableScroll() {
        document.body.classList.remove('no-scroll');
    }

    useEffect(() => {
        if (isOpen) {
            disableScroll();
        }
        else {
            enableScroll();
        }
    }, [isOpen]);
   
    return (
        <>
            <header>
                <nav className="nav-container">
                    <div className="nav-inner-container">
                        <NavLink className="nav-brand" to="/">
                            <img src="/favicon.png" className="header-logo"></img>
                        </NavLink>

                        <div className="nav-toggle" id="nav-toggle" onClick={handleToggle} ref={iconRef}>
                            <img src="/open-burger.svg" className="dropdown-open"></img>
                            <img src="/close-x.svg" className="dropdown-close"></img>
                        </div>

                        <div className="nav-desktop">
                            <NavLink className="page-text" to="/" onClick={handleLink}>Home</NavLink>
                            <NavLink className="page-text" to="/courses" onClick={handleLink}>Courses</NavLink>
                            <NavLink className="page-text" to="/contact" onClick={handleLink}>Contact</NavLink>
                            <NavLink className="page-text" to="/about" onClick={handleLink}>About</NavLink>
                        </div>
                    </div>
                </nav>

                <nav className="nav-menu" id="nav-menu" ref={menuRef}>
                    <ul className="nav-list">
                        <li>
                            <NavLink className="page-text" to="/" onClick={handleLink}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink className="page-text" to="/courses" onClick={handleLink}>Courses</NavLink>
                        </li>
                        <li>
                            <NavLink className="page-text" to="/contact" onClick={handleLink}>Contact</NavLink>
                        </li>
                        <li>
                            <NavLink className="page-text" to="/about" onClick={handleLink}>About</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;