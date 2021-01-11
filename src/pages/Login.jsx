import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { email, name } = this.state;
    if (email.length && name.length) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });

    this.validate();
  }

  render() {
    const { handleChange } = this;
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              id="input-player-name"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ (event) => handleChange(event) }
            />
          </label>

          <label htmlFor="input-gravatar-email">
            Email:
            <input
              id="input-gravatar-email"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

/* const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

}; */

/* export default connect(mapStateToProps, mapDispatchToProps)(Login) */
export default Login;
