import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
      {this.props.messages.map((item, index)=>(
        <Message color={item.color} key={index} content={item.content} username={item.username}/>
      ))}
        <div className="message system">
        </div>
      </div>
    );
  }
}

export default MessageList;
