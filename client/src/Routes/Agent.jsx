import React, {Component} from 'react';
import {CometChat} from '@cometchat-pro/chat';
import config from '../config';
import { ChatBox } from '../components/ChatBox';
import { CustomerList } from '../components/CustomerList';

export const agentUID = config.agentUID;
const AGENT_MESSAGE_LISTENER_KEY = 'agent-listener'
const limit = 30;

class Agent extends Component {
  state = {
    customers: [],
    selectedCustomer: '',
    chat: [],
    chatIsLoading: false,
    customerIsLoading:true
  }
  fetchAuthToken = async uid => {
    const response = await fetch(`${config.baseURL}/api/auth?uid=${uid}`)
    const result = await response.json()
    return result;
  }
  componentDidMount(){
    this.fetchAuthToken(agentUID).then(
      authToken => {
        console.log('auth token fetched', authToken);
        CometChat.login(authToken)
        .then( user => {
          console.log("Login successfully:", { user });
          // after login, fetch all users
          // put them into customer state
          this.fetchUsers().then(result => {
            this.setState({
              customers: result,
              customerIsLoading: false
            })
          });
          
          CometChat.addMessageListener(
            AGENT_MESSAGE_LISTENER_KEY,
            new CometChat.MessageListener({
              onTextMessageReceived: message => {
                let {customers, selectedCustomer, chat} = this.state;
                console.log("Incoming Message Log", { message });
                // check incoming message
                // if from the same customer agent is currently chatting
                // push a new chat item into chat state
                if(selectedCustomer === message.sender.uid){
                  chat.push(message);
                  this.setState({
                    chat
                  })
                } else {
                // if new customer, push a new customer into customer state
                  let aRegisteredCustomer = customers.filter( customer => {
                   return customer.uid === message.sender.uid }); 
                  if(!aRegisteredCustomer.length){
                    customers.push(message.sender)
                    this.setState({
                      customers
                    })
                  }
                }
              }
            })
          );
       })
      },
      error => {
        console.log('Initialization failed with error:', error);
      }
    );
  }
 
  fetchUsers = async () => {
    const response = await fetch(`${config.baseURL}/api/users`)
    const result = await response.json()
    return result;
  }
  
  render() {
      return(
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className="col-md-8 h-100pr border rounded">
              <div className='row'>
                <div className='col-lg-4 col-xs-12 bg-light' style={{ height: 658 }}>
                <div className='row p-3'><h2>Customer List</h2></div>
                <div className='row ml-0 mr-0 h-75 bg-white border rounded' 
                style={{ height: '100%', overflow:'auto' }}>
                {/* The CustomerList component */}
                <CustomerList {...this.state} selectCustomer={this.selectCustomer}/>
                </div>
                </div>
                <div className='col-lg-8 col-xs-12 bg-light'  style={{ height: 658 }}>
                  <div className='row p-3 bg-white'>
                    <h2>Who you gonna chat with?</h2>
                  </div>
                  <div className='row pt-5 bg-white' 
                  style={{ height: 530, overflow:'auto' }}>
                  {/* The ChatBox component */}
                  <ChatBox {...this.state} />
                  </div>
                  <div className="row bg-light" style={{ bottom: 0, width: '100%' }}>
                  <form className="row m-0 p-0 w-100" onSubmit={this.handleSubmit}>
      
                  <div className="col-9 m-0 p-1">
                    <input id="text" 
                      className="mw-100 border rounded form-control" 
                      type="text" 
                      name="text" 
                      ref="message"
                      placeholder="Type a message..."/>
                  </div>
                  <div className="col-3 m-0 p-1">
                    <button className="btn btn-outline-secondary rounded border w-100" 
                      title="Send" 
                      style={{ paddingRight: 16 }}>Send</button>
                  </div>
                  </form>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    handleSubmit = event => {
      event.preventDefault();
      let message = this.refs.message.value;
      var textMessage = new CometChat.TextMessage(
        this.state.selectedCustomer,
        message,
        CometChat.RECEIVER_TYPE.USER,
        CometChat.MESSAGE_TYPE.TEXT,
      );
      
      CometChat.sendMessage(textMessage).then(
        message => {
          let {chat} = this.state;
          console.log('Message sent successfully:', message);
          chat.push(message);
          this.setState({
            chat
          })
        },
        error => {
          console.log('Message sending failed with error:', error);
        }
      );
      this.refs.message.value='';
    }
    selectCustomer = uid => {
      this.setState({
        selectedCustomer: uid
      }, ()=> {this.fetchPreviousMessage(uid)})
    }
        
    fetchPreviousMessage = uid => {
      this.setState({
        hat: [],
        chatIsLoading: true
      }, () => {
        var messagesRequest = new CometChat.MessagesRequestBuilder()
        .setUID(uid)
        .setLimit(limit)
        .build();
        messagesRequest.fetchPrevious().then(
           messages => {
            console.log("Message list fetched:", messages);
            this.setState({
              chat: messages,
                chatIsLoading: false
            })
          },
          error => {
            console.log("Message fetching failed with error:", error);
          }
        );
      });
    }
    componentWillUnmount(){
      CometChat.removeMessageListener(AGENT_MESSAGE_LISTENER_KEY);
      CometChat.logout();
    }
}

export default Agent;