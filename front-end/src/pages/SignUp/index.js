import React from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
width: 100%;
height: 100vh;
display:grid;
grid-template-rows: 1fr 1fr 1fr;
max-height: 100vh;
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
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
    grid-row: 1/2;
`

const Logo = styled.img`
    width:60vw;
    z-index: 1;
    margin-top: 2vh;
    @media(min-width: 600px) {
    width:30vw;
  }
  @media(min-width: 1024px) {
    width:20vw;
  }
`
const Filter = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    position:absolute;
    background-image: linear-gradient(#ffffffd9, #7575756b, #000000c7);
`

const LoginLabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    grid-row: 3/4;
`

const LoginLabel = styled.p`
font-family: 'Montserrat', sans-serif;
color: white;
margin-bottom: 2vw;
margin-top: 2vw;

`

const LoginLink = styled.b`
color: #ffbd4a;
text-decoration: underline;
`

const SwitchContainer = styled.div`
    z-index: 1;
    background-color: #ffffff00;
`

const SignUp = () => {
    const classes = useStyles();
    const urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"
    const history = useHistory();
    const { form, onChange } = useForm({ nameInput: '', nicknameInput: '', emailInput: '', passwordInput: '' })
    const token = localStorage.getItem('token')
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };
    const [forArtist, setForArtist] = React.useState({ status: false });

    const handleChange = (event) => {
        setForArtist({ ...forArtist, [event.target.name]: event.target.checked });
    };

    const onClickSignUp = event => {
        event.preventDefault();
        let body = {}
        let userOrArtist = 'user'
        console.log(forArtist)
        if (forArtist === true) {
            body = {
                name: form.nameInput,
                nickname: form.nicknameInput,
                email: form.emailInput,
                password: form.passwordInput,
            }
            userOrArtist = 'artist'
        } else {
            body = {
                name: form.nameInput,
                nickname: form.nicknameInput,
                email: form.emailInput,
                password: form.passwordInput,
                role: "FREE"
            }
        }
        console.log(body, userOrArtist)
        axios
            .post(
                `${urlBack}/${userOrArtist}/signup`,
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
                history.push("/home")
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const goToLoginPage = () => {
        history.push("/login")
    }
    return (
        <Container className='animation-gradient'>
            <Filter></Filter>
            <LogoContainer>
                <Logo src={Meelzer_linha}></Logo>
            </LogoContainer>
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
                        <SwitchContainer>
                            <FormControlLabel
                                className={classes.switchArtist}
                                control={
                                    <YellowSwitch
                                        checked={forArtist.status}
                                        onChange={handleChange}
                                        name="status"
                                        color="secundary"
                                    />
                                }
                                label="Meelzer for Artists"
                            />
                        </SwitchContainer>
                    </ThemeProvider>
                    <SignUpButton
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                        onClick={onClickSignUp}>
                        Inscrever-se
                    </SignUpButton>
                </Form>
            </FormContainer>
            <LoginLabelContainer>
                <LoginLabel>
                    Já possui uma conta? <LoginLink onClick={goToLoginPage}>Faça login</LoginLink>
                </LoginLabel>
            </LoginLabelContainer>
        </Container>
    )
}
export default SignUp