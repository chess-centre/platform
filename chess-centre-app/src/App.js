import React, { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import logo from './logo.png';
import banner from './banner.png'
import './App.css';
const initialState = {
  username: '', password: '', email: '', authCode: '', formType: 'signIn', picture: ''
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const [formState, updateFormState] = useState(initialState);
  const [user, updateUser] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);


  const setAuthListener = async () => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          updateFormState(() => ({ ...formState, formType: 'signIn' }))
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          updateFormState(() => ({ ...formState, formType: 'signOut' }))
          break;
      }
    });
  }

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user', user);
      updateUser(user);
      updateFormState(() => ({ ...formState, formType: 'signedIn' }))
    } catch (error) {
      updateUser(null);
    }
  }

  const onChange = e => {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }

  const { formType } = formState;


  const signUp = async () => {
    const { username, password, email, picture } = formState;
    await Auth.signUp({ username, password, attributes: { email, picture } });
    updateFormState(() => ({ ...formState, formType: 'confirmSignUp' }))
  }
  const confirmSignUp = async () => {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: 'signIn' }))
  }
  async function signIn(){
    const { username, password } = formState;
    await Auth.signIn(username, password);
    updateFormState(() => ({ ...formState, formType: 'signedIn' }))
  }

  const signOut = async () => {
    await Auth.signOut();
    updateFormState(() => ({ ...formState, formType: 'signUp' }))
  }

  const gotoSignIn = () => {
    updateFormState(() => ({ ...formState, formType: 'signIn' }))
  }

  return (
    <Container>
      {
        formType === 'signIn' && (<SignIn submit={signIn} />)
      }
            {
        formType === 'signUp' && (<SignIn submit={signUp} />)
      }

    </Container>
  );
}

export default App;
