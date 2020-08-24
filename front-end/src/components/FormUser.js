import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import '../App.css'

import { useForm } from '../hooks/useForm'

import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

            backgroundColor: '#ffffff00',
        },
    },
    '&.Mui-focused fieldset': {
        borderColor: 'green',
    },
    margin: {
        backgroundColor: '#ffffff',
        width: '80%',
    },
    switchArtist: {
        backgroundColor: '#ffbd4a00',
        color: "#ffffff",
        zIndex: "modal",

    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secundary: {
            main: '#ffbd4a',
        },
    },
});

const YellowSwitch = withStyles({
    switchBase: {
        color: amber[0],
        '&$checked': {
            color: amber[300],
        },
        '&$checked + $track': {
            backgroundColor: amber[300],
        },
    },
    checked: {},
    track: {},
})(Switch);

const FormContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Form = styled.form`
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-row: 2/3;
    margin-top: 5vh;
    @media(min-width: 800px) {
    width:50%;
  }
`

const SignUpButton = styled(Button)`
&&{
    background-color: #ffbd4a;
    color: black;
    border-radius: 35px;
}
`

const FormUser = () => {
    const classes = useStyles();
    let urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"
    const history = useHistory();
    const { form, onChange } = useForm({ nameInput: '', nicknameInput: '', emailInput: '', passwordInput: '' })
    const token = localStorage.getItem('token')
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };

    const onClickSignUp = event => {
        event.preventDefault();
        let userOrArtist = ''
        const body = {
            name: form.nameInput,
            nickname: form.nicknameInput,
            email: form.emailInput,
            password: form.passwordInput,
            role: "ADMIN"
        }
        axios
            .post(
                `${urlBack}/user/signup`,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
            <FormContainer>
                <Form autocomplete="false" className={classes.root} noValidate>
                    <ThemeProvider theme={theme}>
                        <TextField
                            className={classes.margin}
                            label="Nome completo"
                            variant="filled"
                            name="nameInput"
                            value={form.nameInput}
                            onChange={handleInputChange}
                        />
                        <TextField
                            className={classes.margin}
                            label="Nome de usuário"
                            variant="filled"
                            name="nicknameInput"
                            value={form.nicknameInput}
                            onChange={handleInputChange}
                        />
                        <TextField
                            className={classes.margin}
                            label="E-mail"
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
                            name="passwordInput"
                            value={form.passwordInput}
                            onChange={handleInputChange}
                            type='password'
                        />
                    </ThemeProvider>
                    <SignUpButton
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                        onClick={onClickSignUp}>
                        Cadastrar
                    </SignUpButton>
                </Form>
            </FormContainer>
    )
}
export default FormUser