import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
    renderList(){
        switch(this.props.auth){
            case null:
                return null;
            case '':
                return <li><a href="/auth/facebook">Login</a></li>;
            default:
                return [
                    <li key="0"><Link to="/chat-lobby">Chat Lobby</Link></li>,
                    <li key="1"><a href="/api/logout">Logout</a></li>
                ]
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper deep-purple darken-3">
                    <Link to="/" className="brand-logo">Chatty App</Link>
                    <ul className="right">
                        {this.renderList()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps)(Nav);
