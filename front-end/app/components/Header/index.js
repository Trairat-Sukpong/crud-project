import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import Display from './Display';

function Header() {
  return (
    <>
      <Display>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
           <HeaderLink to="/shop">
            <FormattedMessage {...messages.shop} />
          </HeaderLink>
          <HeaderLink to="/store">
            <FormattedMessage {...messages.store} />
          </HeaderLink>
           <HeaderLink to="/signin">
            <FormattedMessage {...messages.signin} />
          </HeaderLink>
          <HeaderLink to="/signup">
            <FormattedMessage {...messages.signup} />
          </HeaderLink>
        </NavBar>

        <A href="">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
      </Display>
    </>
  );
}

export default Header;
