import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const features = [
    {
        icon: "➕",
        title: "Add Car",
        desc: "Register any vehicle and instantly receive a calculated performance score based on engine specs, power, and efficiency.",
        to: "/add",
        cta: "Add Vehicle",
        gradient: "from-blue",
    },
    {
        icon: "⚔️",
        title: "Compare Cars",
        desc: "Head-to-head performance battles. Select any two cars and let the AI reveal which machine dominates the other.",
        to: "/compare",
        cta: "Start Battle",
        gradient: "from-purple",
    },
    {
        icon: "🏎️",
        title: "My Garage",
        desc: "Browse your complete vehicle directory with all specs at a glance. Manage, review, and remove entries effortlessly.",
        to: "/garage",
        cta: "Open Garage",
        gradient: "from-teal",
    },
    {
        icon: "🏆",
        title: "Top Performers",
        desc: "Discover which cars reign supreme. Our leaderboard surfaces the highest-scoring vehicles from your entire collection.",
        to: "/top",
        cta: "View Leaders",
        gradient: "from-gold",
    },
];

function StatCounter({ target, label, suffix = "" }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target]);
    return (
        <div className="hero-stat">
            <span className="hero-stat-num">{count.toLocaleString()}{suffix}</span>
            <span className="hero-stat-label">{label}</span>
        </div>
    );
}

function HomePage() {
    return (
        <div className="page-container animate-fade-in">
            {/* ── Hero ── */}
            <section className="hero">

                <h1 className="hero-headline">
                    Unleash the Power<br />
                    <span className="gradient-text">Behind Every Engine</span>
                </h1>

                <p className="hero-sub">
                    Our engine analyses horsepower, torque, mileage, and more to deliver
                    precise performance scores — so you always know which car wins.
                </p>

                <div className="hero-cta-group">
                    <Link to="/add" className="btn btn-primary btn-lg">
                        ⚡ Analyse a Car
                    </Link>
                    <Link to="/garage" className="btn btn-ghost btn-lg">
                        View Garage →
                    </Link>
                </div>

                <div className="hero-stats stagger">
                    <StatCounter target={11} label="Fields Captured" />
                    <div className="hero-stat-divider" />
                    <StatCounter target={4} label="Score Inputs" />
                    <div className="hero-stat-divider" />
                    <StatCounter target={1} label="Score Formula" />
                </div>
            </section>

            {/* ── Feature Cards ── */}
            <section className="features-section">
                <div className="section-label">What You Can Do</div>
                <h2 className="features-heading">Everything you need,<br />in one dashboard</h2>

                <div className="features-grid stagger">
                    {features.map((f) => (
                        <div key={f.to} className={`feature-card ${f.gradient}`}>
                            <div className="feature-card-icon">{f.icon}</div>
                            <h3 className="feature-card-title">{f.title}</h3>
                            <p className="feature-card-desc">{f.desc}</p>
                            <Link to={f.to} className="feature-card-link">
                                {f.cta} <span className="arrow">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
