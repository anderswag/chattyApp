import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.state =  {
      currentUser: {
        name: "Bob"
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this)
  }

  insertNewMessage(messages, newMessage) {
    return messages.concat([newMessage])
  }
//Send message
  sendMessage(message) {
    console.log(message);
    // Send message to server
    this.socket.send(JSON.stringify(message));
    //Waiting to recieve data from the server
    this.socket.onmessage = (event) => {
      // Store the returned data object inside a variable
      let newState = Object.assign({}, this.state, {
        //event.data is the new created message coming in from the server
        messages: this.insertNewMessage(this.state.messages, JSON.parse(event.data))
      })
      //Sets the new state
      this.setState(newState)
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:4000");
    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        console.log(event.data);
      }
    }
    console.log("ComponentDidMount <App />")
  }

  render() {
    return (
      <div className = "wrapper">
          <nav>
            <h1>Chatty</h1>
         </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onSend={ this.sendMessage } />
      </div>
    );
  }
}
export default App;
