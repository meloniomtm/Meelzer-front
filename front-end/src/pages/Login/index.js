import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import '../../App.css'

import { useForm } from '../../hooks/useForm'

import Meelzer_linha from '../../images/Meelzer_logo_texto_amarelo.png';

import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '80%',
            backgroundColor: '#ffffff',
        },
    },
    '&.Mui-focused fieldset': {
        borderColor: 'green',
    },
    margin: {
        backgroundColor: '#ffffff',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
    },
});

const Container = styled.div`
width: 100%;
height: 100vh;
display:grid;
grid-template-rows: 1fr 1fr 1fr;
max-height: 100vh;
`

const Form = styled.form`
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-row: 2/3;
    margin-top: 18vw;
`

const LoginButton = styled(Button)`
&&{
    background-color: #ffbd4a;
    color: black;
    border-radius: 35px;
}
`
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
    grid-row: 1/2;
`

const Loading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
    grid-row: 1/2;
    width: ${({ activeLoading }) => (activeLoading ? '25vw' : '')};
    overflow: ${({ activeLoading }) => (activeLoading ? 'hidden' : '')};
    transition: 1s;

`


const Logo = styled.img`
    width:60vw;
    z-index: 1;
    position: ${({ activeLoading }) => (activeLoading ? 'relative' : '')};
    right: ${({ activeLoading }) => (activeLoading ? '-18vw' : '')};
    transition: 1s;
`
const Filter = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    position:absolute;
    background-image: linear-gradient(#ffffffd9, #7575756b, #000000c7);
`

const SignUpButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    grid-row: 3/4;
`

const SignUpLabel = styled.p`
font-family: 'Montserrat', sans-serif;
color: white;
margin-bottom: 2vw;
margin-top: 2vw;
`

const SignUpButton = styled(Button)`
&&{
    color: white;
    border: 1px white solid;
    background-color: #00000000;
    border-radius: 36px;
    width: 80%;
}
`



const Login = () => {
    const classes = useStyles();
    const urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"
    const history = useHistory();
    const { form, onChange } = useForm({ emailInput: '', InputPassword: '' })
    const token = localStorage.getItem('token')
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };
    const [loading, setLoading] = useState(false)

    const onClickLogin = event => {
        startLoading()
        event.preventDefault();
        try {
            const body = {
                email_Nickname: form.emailInput,
                password: form.InputPassword
            }
            axios
                .post(
                    `${urlBack}/login`,
                    body,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response) => {
                    localStorage.setItem("token", response.data.token)
                    console.log(response.data)
                    startLoading()
                    history.push("/home")
                })
                .catch((error) => {
                    console.log("error")
                    startLoading()
                })
        } catch{
            console.log("catch")
            startLoading()
        }

    }

    const startLoading = () => {
        setLoading(!loading)
    }

    const goToSignUp = () => {
        history.push("/signup")
    }

    return (
        <Container className='animation-gradient'>
            <Filter></Filter>
            <LogoContainer>
                <Loading activeLoading={loading} >
                    <Logo activeLoading={loading} src={Meelzer_linha}></Logo>
                </Loading>
            </LogoContainer>
            <Form autocomplete="false" className={classes.root} noValidate>
                <ThemeProvider theme={theme}>
                    <TextField
                        className={classes.margin}
                        label="E-mail/Nickname"
                        variant="filled"
                        name="emailInput"
                        value={form.emailInput}
                        onChange={handleInputChange}
                        autocomplete="email"
                    />
                    <TextField
                        className={classes.margin}
                        label="senha"
                        variant="filled"
                        name="InputPassword"
                        value={form.InputPassword}
                        onChange={handleInputChange}
                        type='password'
                    />
                </ThemeProvider>
                <LoginButton
                    variant="contained"
                    color="primary"
                    onClick={onClickLogin}>
                    Entrar
                    </LoginButton>
            </Form>
            <SignUpButtonContainer>
                <SignUpLabel>Não tem uma conta?</SignUpLabel>
                <SignUpButton onClick={goToSignUp} variant="contained">Inscreva-se no Meelzer</SignUpButton>
            </SignUpButtonContainer >
        </Container>
    )
}
export default Login