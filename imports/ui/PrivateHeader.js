import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';


const PrivateHeader = (props) => {
  return (
        <div className="header">
          <div className="header-content">
            <h1>{props.title}</h1>
            <button className="button button-secondary" onClick={() => Accounts.logout()} >Logout</button>
          </div>
        </div>
      );
}

PrivateHeader.PropTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;
