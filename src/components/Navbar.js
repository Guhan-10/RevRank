import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { to: "/", label: "Home" },
        { to: "/garage", label: "Garage" },
        { to: "/add", label: "Add Car" },
        { to: "/compare", label: "Compare" },
        { to: "/top", label: "Top Cars" },
    ];

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🏁</span>
                    <span className="brand-text">RevRank</span>
                </Link>

                {/* Desktop links */}
                <ul className="nav-links">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile dropdown */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`mobile-link ${isActive(link.to) ? "active" : ""}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
