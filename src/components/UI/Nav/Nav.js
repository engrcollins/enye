import React, { useState, useEffect } from 'react';
import Ping from '../Link/Ping';
import BLink from '../Link/Link';

const Nav = () => {
  const [navClass, setNavClass] = useState('');
  const [toggeledNav, settoggeledNav] = useState(false);

  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let navClass = '';
      if (window.scrollY >= 200) {
        navClass = 'scrolled';
      }
      setNavClass(navClass);
    });
  }, []);
  return (
    <nav className={`navbar navbar-expand-md ${navClass}`}>
      <div className='container'>
        <a className='navbar-brand' href='!#'>
          <span>Tech Plugs</span>
          <i className='fas fa-circle fa-circle-light ml-1' />
        </a>
        <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return 'open';
            return '';
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return 'show';
            return '';
          })()}`}
        >
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'  style={{color:'white'}}>
              <BLink target='/'  classes='nav-link'>
                Home
              </BLink>
            </li>
            <li className='nav-item'  style={{color:'white'}}>
                <Ping target='/Latestjobs' classes='nav-link'>
                  Reviews
              </Ping>
            </li>
            <li className='nav-item'>
              <Ping target='blog' classes='nav-link'>
                Blog
              </Ping>
            </li>
            <li className='nav-item'>
              <Ping target='contact' classes='nav-link'>
                Contact
              </Ping>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
