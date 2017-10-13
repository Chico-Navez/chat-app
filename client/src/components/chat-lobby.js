import React, { Component } from 'react';
import io from 'socket.io-client';

class ChatLobby extends Component {
	constructor(props){
		super(props);

		this.state = {
			msg: '',
			allMsgs: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.sendMsg = this.sendMsg.bind(this);
	}	

	componentDidMount(){
		this.socket = io('http://localhost:3500');
		this.socket.on('chat message', msg => {
			this.setState({
				allMsgs: [msg, ...this.state.allMsgs]
			});
		});
	}

	handleChange(e){
		this.setState({
			msg: e.target.value
		});
	}

	sendMsg(){
		console.log('Message:', this.state.msg);
		this.socket.emit('chat message', )
	}

    render(){
    	const { msg, allMsgs } = this.state;
    	const msgList = allMsgs.map((msg, index) => {
    		return <li key={index}>{msg}</li>
    	});
        return (
            <div>
            	<h1></h1>
            	Message <input type="text" value={msg}/>
            	<button onClick={this.sendMsg}>Send</button>
            </div>
        )
    }
}

export default ChatLobby;
