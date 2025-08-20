// src/pages/Contacts.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../components/Contacts.css';

export default function Contacts() {
  return (
    <section className="contacts-container page-content">
      <h2 className="contacts-title">Get in Touch</h2>
      <p className="contacts-description">
        Feel free to reach out through any of the following platforms:
      </p>

      <div className="contacts-links">
        <a
          href="https://github.com/RodriguezRamiro"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a
          href="https://www.linkedin.com/in/ramiro-rodriguez-3a287a328"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/software.map"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        {/*}
        <a
          href="https://twitter.com/your_twitter_handle"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        */}
      </div>

      <p className="contacts-email">
        Email: <a href="mailto:rodriguezcodesolutions@gmail.com">rodriguezcodesolutions@gmail.com</a>
      </p>
    </section>
  );
}
