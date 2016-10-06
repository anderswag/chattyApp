import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type:"",
      username: "Anon",
      content: "",
      olduser:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    /*this.handleUsernameChange = this.handleUsernameChange.bind(this);*/
    this.handleKeyupUser = this.handleKeyupUser.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }
 /* handleUsernameChange(event) {
    this.setState({username:event.target.value});
  }*/
  handleKeyupUser(event) {
    if (event.keyCode === 13) {
      if(this.state.username !== event.target.value){
        this.setState({
          olduser:this.state.username,
          username:event.target.value,
          type:'postNotification'
        },function whenFinished(){
          this.props.onSend(this.state);
        });
      }
    }
  }
  handleKeyup(event) {
    if (event.keyCode === 13) { // on entered
      this.setState({type:'postMessage'}, ()=>{
        this.props.onSend(this.state); // get the custom props function and call it with state
        this.setState({content:''}); // sets the content state back to an empty string
      })
      this.refs.contentfield.value="";
    }
  }

  render() {
    return (
      <footer>
        <input  id="username"
                type="text"
                placeholder="Your Name (Optional)"
                value={this.state.value}
                /*onChange={this.handleUsernameChange}*/
                onKeyUp={this.handleKeyupUser}
                ref="userfield"
        />
        <input id="new-message"
               type="text"
               placeholder="Type a message and hit ENTER"
               value={this.state.value}
               onChange={this.handleChange}
               onKeyUp={this.handleKeyup}
               ref="contentfield"
         />
      </footer>
    );
  }
}

export default ChatBar;
