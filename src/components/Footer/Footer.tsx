import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className='footer-container'>
      <footer>
        <div className="left-footer">
          <ul>
            <li><a href="#" title='Privacy Policy'>Privacy Policy</a></li>
            <li><a href="#" title='Privacy Notice'>Privacy Notice</a></li>
            <li><a href="#" title='Having Trouble Logging in?'>Need Help?</a></li>
            <li><a href="#" title='cookies'>Change your cookie settings</a></li>
          </ul>
        </div>
        <div className="right-footer">
          <p>© 2023 Schneider Electric Industries SAS. All Rights Reserved. This application is protected by copyright law and international treaties.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
