import React, { Component } from "react";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import Button from "../../components/ui-elements/buttons/button";
import Input from "../../components/ui-elements/input/input";
import "./auth.css";
import Logo from "../../assets/icons/logo.svg";


const signInState = {
  controls: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-Mail Adresse",
      },
      value: "",
      validation: {
        required: true,
        isEmaiil: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Passwort eingeben",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  },
  isSignUp: false,
};

const signUpState = {
  controls: {
    username: {
      elementType: "username",
      elementConfig: {
        type: "text",
        placeholder: "Username eingeben",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    forename: {
      elementType: "name",
      elementConfig: {
        type: "text",
        placeholder: "Vorname eingeben",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      touched: false,
    },
    surname: {
      elementType: "surname",
      elementConfig: {
        type: "text",
        placeholder: "Nachname eingeben",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "E-Mail Adresse",
      },
      value: "",
      validation: {
        required: true,
        isEmaiil: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Passwort eingeben",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  },
  isSignUp: true,
};

class Auth extends Component {
  state = signInState;

  switchAuthModeHandler = () => {
    if (this.state.isSignUp) {
      this.setState(signInState);
    } else {
      this.setState(signUpState);
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
    console.log(this.state);
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.isSignUp) {
      const signUpData = {
        username: this.state.controls.username.value,
        name: this.state.controls.forename.value,
        surname: this.state.controls.surname.value,
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      }
      this.props.onAuth(true, signUpData);
    } else {
      const signInData = {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      }
      this.props.onAuth(false, signInData);
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className="auth-container">
        <img src={Logo} alt="Logo" className="auth-container-logo"></img>
        <form>{form}</form>
        <div className="auth-button-container">
          <Button clicked={this.submitHandler} btnStyle="blue">
            Submit
          </Button>
          <Button clicked={this.switchAuthModeHandler} btnStyle="mint">
            Switch to {this.state.isSignUp ? "Sign in" : "Sign up"}{" "}
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (isSignUp, data) => dispatch(actions.auth(isSignUp, data))
  }

}

export default connect(null, mapDispatchToProps)(Auth);

