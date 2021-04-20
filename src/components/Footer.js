import React from 'react';
import {Link} from 'react-router-dom';

const footerLinks = [
  {label: "Terms of Service", href: "/terms-of-service"},
  {label: "Privacy Policy", href: "/privacy-policy"}
];

const Footer = (props) => {
  return (
    <footer className={props.isDashboardFooter ? 'footer dashboard-footer' : 'footer'}>

      <p className="footer-copyright">&copy; WhiteBox HR 2020</p>

      <ul className="footer-links">

        {footerLinks.map((link, i) => (
          <li key={i}>
            <Link className="footer-copyright" to={link.href}>{link.label}</Link>
          </li>
        ))}

      </ul>

    </footer>
  )
};

export default Footer;
