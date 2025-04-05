import React, { useState } from "react";
import "./ContactUs.css";  // Updated CSS file name

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We will get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page-container">
      <h2 className="contact-title">📞 Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="contact-label">Name:</label>
        <input className="contact-input" type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label className="contact-label">Email:</label>
        <input className="contact-input" type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label className="contact-label">Message:</label>
        <textarea className="contact-textarea" name="message" value={formData.message} onChange={handleChange} required />

        <button className="contact-submit-button" type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
