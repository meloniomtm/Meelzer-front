import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import FormUser from '../../components/FormUser'
import FormGenre from '../../components/FormGenre'
import { useForm } from '../../hooks/useForm'
import { url } from '../../reducers/meelzerReducer'

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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
flex-direction: column;
justify-content: start;
overflow: scroll;
overflow-x: hidden;
`

const Title = styled.p`
width: 100%;
font-size: 2em;
font-family: 'MuseoModerno', cursive;
height: fit-content;
display: flex;
justify-content: space-between;
align-items: center;
padding: 5vw;
`

const FormContainerAdmin = styled.div`
    width: 100%;
    height: ${({ expand }) => (expand ? '55vh' : '0')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #262626;
    transition: 1s;
    padding-top: ${({ expand }) => (expand ? '5vw' : '0')};
    padding-bottom: ${({ expand }) => (expand ? '5vw' : '0')};
    content-visibility: auto;
`
const FormContainerGenre = styled.form`
    width: 100%;
    height: ${({ expand }) => (expand ? '55vh' : '0')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #262626;
    transition: 1s;
    padding-top: ${({ expand }) => (expand ? '5vw' : '0')};
    padding-bottom: ${({ expand }) => (expand ? '5vw' : '0')};
    content-visibility: auto;
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

const Add = () => {
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
    const [expandAdmin, setExpandAdmin] = useState(false)
    const [expandGenre, setExpandGenre] = useState(false)

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
        axios.get(`${url}/artist/getAllArtists`, {
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

    const expandMoreAdmin = () => {
        setExpandAdmin(!expandAdmin)
    }

    const expandMoreGenre = () => {
        setExpandGenre(!expandGenre)
    }

    return (
        <Container>
            <MainContainer>
                <Title onClick={expandMoreAdmin}>Adicionar administradores <ExpandMoreIcon /></Title>
                <FormContainerAdmin expand={expandAdmin}>
                <FormUser />
                </FormContainerAdmin>
                <Title onClick={expandMoreGenre}>Adicionar gêneros <ExpandMoreIcon /> </Title>
                <FormContainerGenre expand={expandGenre}>
                    <FormGenre />
                </FormContainerGenre>
            </MainContainer>
            {navType()}
        </Container>
    )
}
export default Add