
import React from 'react';
import axios from 'axios';
import './Chat.css'
import wait from '../../img/msg.gif';

let FRANK_KEY = 'CC7s0SEdWk8ecTT3i6VoTmsAPjA';

const bot = axios.create({
    baseURL: 'https://www.cleverbot.com',
    timeout: 15000,
    params: { key: FRANK_KEY }
});

export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            conversation: [{
                msg: 'Hi my name is Frank!',
                sender: 'remote'
            }]
        }
    }

    clickMessages = () => {
        const { conversation } = this.state;
        conversation.push({ msg: 'You do not have any messages because im your only friend.', sender: 'remote' })
        this.setState({ input: '', conversation });
    }

    clickContact = () => {
        const { conversation } = this.state;
        conversation.push({ msg: 'I am your only contact...', sender: 'remote' })
        this.setState({ input: '', conversation });
    }

    handleInput = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    talkFrank = (e) => {
        e.preventDefault();
        const { input: msg, conversation } = this.state;
        if (this.state.input <= 0) {
            alert('You dont want to talk :(')
        } else {
            conversation.push({ msg, sender: 'local' })
            this.setState({ input: '', conversation });

            setTimeout(() => {
                bot.get('getreply', { params: { input: msg } })
                    .then(res => {
                        conversation.push({
                            msg: res.data.output,
                            sender: 'remote'
                        });
                        this.setState({ conversation });
                    });
            }, 1000);
        }
    }

    render() {
        const { conversation } = this.state;
        return (
            <div className="phone">
                <header><span className="left" onClick={this.clickMessages}>Messages</span><h2>Frank 🌱</h2><span className="right" onClick={this.clickContact}>Contact</span></header>
                <div className="messages-wrapper">
                    {
                        conversation.length > 0 && conversation.map((convo, i) => {
                            return (<div key={i} className={`message ${convo.sender === 'local' && 'to' || 'from'}`}>
                                {convo.msg}
                            </div>)
                        })
                    }
                </div>
                <form action="" onSubmit={this.talkFrank}>
                    <input type="text" onChange={this.handleInput} name="input" placeholder="iMessage" value={this.state.input} />
                </form>
            </div>
        )
    }
}


