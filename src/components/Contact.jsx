import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

export default function Contact() {
    const { theme, dark } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: theme.backgroundColor, color: theme.color, minHeight: '100vh' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <button
                        className="btn btn-outline-primary mb-4"
                        onClick={() => navigate('/')}
                        style={{ borderColor: theme.headerColor, color: theme.headerColor }}
                    >
                        ← Back to Home
                    </button>

                    <div className="card shadow-lg border-0" style={{ backgroundColor: theme.cardBackground }}>
                        <div className="card-body p-5">
                            <div className="text-center mb-5">
                                <h1 className="display-4 mb-3" style={{ color: theme.headerColor }}>
                                    🌺 Contact Us 🌺
                                </h1>
                                <p style={{ color: theme.cardText, fontSize: '1.2rem' }}>
                                    We'd love to hear from you about our orchid collection!
                                </p>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="contact-info p-4 rounded" style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(108, 52, 131, 0.1)' }}>
                                        <h4 style={{ color: theme.headerColor }}>📍 Visit Our Garden</h4>
                                        <p style={{ color: theme.cardText }}>
                                            147 Orchid Street<br />
                                            Flower District, Garden City<br />
                                            Postal Code: 14072005
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="contact-info p-4 rounded" style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(108, 52, 131, 0.1)' }}>
                                        <h4 style={{ color: theme.headerColor }}>📞 Get In Touch</h4>
                                        <p style={{ color: theme.cardText }}>
                                            Phone: +84 33 499 2929<br />
                                            Email: lamhuynhhueman.ptht@gmail.com<br />
                                            Hours: 9 AM - 6 PM Daily
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form mt-4">
                                <h4 className="mb-4" style={{ color: theme.headerColor }}>💬 Send us a message</h4>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                                required
                                                style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.3)' : 'white', color: theme.cardText, border: `1px solid ${theme.headerColor}` }}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Your Email"
                                                required
                                                style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.3)' : 'white', color: theme.cardText, border: `1px solid ${theme.headerColor}` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Subject"
                                            required
                                            style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.3)' : 'white', color: theme.cardText, border: `1px solid ${theme.headerColor}` }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder="Your Message"
                                            required
                                            style={{ backgroundColor: dark ? 'rgba(0, 0, 0, 0.3)' : 'white', color: theme.cardText, border: `1px solid ${theme.headerColor}` }}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-lg px-5"
                                        style={{ backgroundColor: theme.headerColor, color: 'white', border: 'none' }}
                                        onClick={() => { alert('Message sent!') }}
                                    >
                                        Send Message 💌
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}