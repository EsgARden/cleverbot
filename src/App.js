import React, { Component } from 'react';

import './css/style.css'

// Components
import { Chat } from './components/Chat/Chat';
import { Gify } from './components/Gify/Gify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleChat: false
    }
  }

  toggleChat = () => {
    this.setState({
      toggleChat: true
    })
  }

  render() {
    return (
      <div className="">
        {/* <Gify /> */}
        <Chat />
        {/* {
          this.state.toggleChat
            ?
            <div className="chat"><Chat /></div>
            :
            <div className="landing">
              <h1 className="title">damelo</h1>
              <i className="fa fa-comments-o chat-button" onClick={this.toggleChat}></i>
            </div>
        } */}
      </div>
    )
  }
}

export default App;
