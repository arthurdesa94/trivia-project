import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hash: '',
      score: '',
    };
    this.handleState = this.handleState.bind(this);
  }

  componentDidMount() {
    this.handleState();
  }

  handleState() {
    const {
      player: { gravatarEmail, name, score },
    } = JSON.parse(localStorage.getItem('state'));
    const hash = md5(gravatarEmail);
    this.setState({
      name,
      hash,
      score,
    });
  }

  render() {
    const { name, hash, score } = this.state;
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } 
        alt="Player avatar" data-testid="header-profile-picture" 
        className="avatar"/>
        <span data-testid="header-player-name">{ name }</span>
        <div className="score">
          <span data-testid="header-score">{ score }</span>
        </div>
      </div>
    );
  }
}

export default Header;
