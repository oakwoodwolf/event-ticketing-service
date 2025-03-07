import React, {Component} from 'react';
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
import { CometChat } from '@cometchat-pro/chat';
import config from '../config';
import 'react-chat-widget/lib/styles.css';

const agentUID = config.agentUID;
const CUSTOMER_MESSAGE_LISTENER_KEY = "client-listener";
const limit = 30;

class Unauthorized extends Component {
    
      
  render() {
    return (
      <div className='App'>
        <h1>UNAUTHORIZED</h1>
      </div>
    );
  }

}

export default Unauthorized;