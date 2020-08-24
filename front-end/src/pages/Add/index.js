import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { useForm } from '../../hooks/useForm'

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

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'
import CardArtist from '../../components/CardArtist'

import '../../App.css'


const Container = styled.div`
width: 100%;
height: 100vh;
display:grid;
grid-template-rows: 9fr 1fr;
max-height: 100vh;
background-color: #000000ad;
color: white;
overflow: hidden;
`
const MainContainer = styled.div`
grid-row: 1/2;
background-color: #00000047;
width: 100%;
max-width: 100vw;
height: 90vh;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding: 5vw;
overflow: scroll;
overflow-x: hidden;
`

const Title = styled.p`
width: 100%;
font-size: 2em;
font-family: 'MuseoModerno', cursive;
margin-bottom: 5vw;
`

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

const Approve = () => {
    const classes = useStyles();
    const { form, onChange } = useForm({ nameInput: '', nicknameInput: '', emailInput: '', passwordInput: '' })
    const token = localStorage.getItem('token')
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };
    const history = useHistory()
    const [welcomePhrase, setWelcomePhrase] = useState(0)
    const [artists, setArtists] = useState([])

    let urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"

    const navType = () => {
        let accountType = localStorage.getItem('accountType')
        accountType = accountType.toUpperCase()
        if (accountType === "FREE" || accountType === "PAYING") {
            return <BottomNavigationUser></BottomNavigationUser>
        }
        if (accountType === "ADMIN") {
            return <BottomNavigationAdmin></BottomNavigationAdmin>
        }
        if (accountType === "ARTIST") {
            return <BottomNavigationArtist></BottomNavigationArtist>
        }
    }

    const getArtists = () => {
        axios.get(`${urlBack}/artist/getAllArtists`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setArtists(response.data.artist)
            console.log(response)
        }).catch(error => {
            try {
                if (error.response.data.error === "jwt expired") {
                    alert("Sua sessão expirou!")
                    goToLogin()
                }
            } catch{ }
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('token') && !localStorage.getItem('accountType')) {
            goToLogin()
        }
        getArtists()
        window.scrollTo(0, 1);
    }, []);

    const goToLogin = () => {
        history.push("/login")
    }

    return (
        <Container>
            <MainContainer>
                <Title>Adicionar administradores</Title>
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
                        >
                            Registrar
                    </SignUpButton>
                    </Form>
                </FormContainer>
                <Title>Adicionar gêneros</Title>
                <FormContainer>
                    <Form autocomplete="false" className={classes.root} noValidate>
                        <ThemeProvider theme={theme}>
                            <TextField
                                className={classes.margin}
                                label="senha"
                                variant="filled"
                                name="passwordInput"
                                value={form.passwordInput}
                                onChange={handleInputChange}
                                type='password'
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
                        >
                            Registrar
                    </SignUpButton>
                    </Form>
                </FormContainer>
            </MainContainer>
            {navType()}
        </Container>
    )
}
export default Approve