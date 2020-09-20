import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import FormUser from '../../components/FormUser'
import { useForm } from '../../hooks/useForm'
import { url } from '../../reducers/meelzerReducer'

import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const FormContainerMusic = styled.div`
    width: 100%;
    height: ${({ expand }) => (expand ? 'fit-content' : '0')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #262626;
    transition: 1s;
    padding-left: 5vw;
    padding-top: ${({ expand }) => (expand ? '5vw' : '0')};
    padding-bottom: ${({ expand }) => (expand ? '5vw' : '0')};
    content-visibility: auto;
`
const FormContainerAlbum = styled.form`
    width: 100%;
    padding-left: 5vw;
    height: ${({ expand }) => (expand ? 'fit-content' : '0')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #262626;
    transition: 1s;
    padding-top: ${({ expand }) => (expand ? '5vw' : '0')};
    padding-bottom: ${({ expand }) => (expand ? '5vw' : '0')};
    content-visibility: auto;
`

const Title = styled.p`
padding-left: 5vw;
width: 100%;
font-size: 2em;
font-family: 'MuseoModerno', cursive;
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
    @media(min-width: 800px) {
    width:50%;
  }
`
const CreateMusic = styled(Button)`
&&{
    background-color: #ffbd4a;
    color: black;
    border-radius: 35px;
}
`

const DatePicker = styled.input`
background-color: #e8e8e8;
color: #6a6a6a;
width: 80%;
height: 15%;
border: none;
padding-top: 6vw;
padding-left: 3vw;
padding-right: 3vw;
padding-bottom: 4vw;

`

const Label = styled.label`
display:block;
`

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
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
    formControl: {
        margin: theme.spacing(1),
        width: '80%',
        backgroundColor: "#ffffff",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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


const Release = () => {
    const classes = useStyles();
    const history = useHistory()
    const [genres, setGenres] = useState([])
    const { form, onChange } = useForm({ nameMusicInput: '', genreMusicInput: '', nameAlbumInput: '', genreInput: '', releasedInMusicInput: "2017-05-24", releasedInAlbumInput: "2017-05-24" })
    const [expandMusic, setExpandMusic] = useState(false)
    const [expandAlbum, setExpandAlbum] = useState(false)
    const token = localStorage.getItem('token')
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value);
    };


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

    const getGenres = () => {
        axios.get(`${url}/genre/getAllGenre`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setGenres(response.data.genre)
        }).catch(error => {
            console.log(error)
            console.log(error.response)
            if (error.response.data.error === "jwt expired") {
                alert("Sua sessão expirou!")
                goToLogin()
            }
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('token') && !localStorage.getItem('accountType')) {
            goToLogin()
        }
        getGenres()
        window.scrollTo(0, 1);
    }, []);

    const goToLogin = () => {
        history.push("/login")
    }

    const createMusic = event => {
        event.preventDefault();
        const body = {
            name: form.nameMusicInput,
            releasedIn: form.releasedInMusicInput,
            genre: form.genreMusicInput
        }
        console.log(body)
        axios
            .post(
                `${url}/music/createMusic`,
                body,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                alert(response.data)
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }

    const createAlbum = event => {
        event.preventDefault();
        const body = {
            name: form.nameMusicInput,
            genre: form.genreInput,
            releasedIn: form.releasedInMusicInput
        }
        console.log(body)
        axios
            .post(
                `${url}/album/createAlbum`,
                body,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                alert(response.data)
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }

    const expandMoreMusic = () => {
        setExpandMusic(!expandMusic)
    }

    const expandMoreAlbum = () => {
        setExpandAlbum(!expandAlbum)
    }

    return (
        <Container>
            <MainContainer>
                <Title onClick={expandMoreMusic}>Lançar música <ExpandMoreIcon /></Title>
                <FormContainerMusic expand={expandMusic} autocomplete="false" className={classes.root} noValidate>
                    <ThemeProvider theme={theme}>
                        <TextField
                            className={classes.margin}
                            label="Nome"
                            variant="filled"
                            name="nameMusicInput"
                            value={form.nameMusicInput}
                            onChange={handleInputChange}
                        />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                name="genreMusicInput"
                                value={form.genreMusicInput}
                                onChange={handleInputChange}>
                                {genres.map(item => (
                                    <MenuItem key={item.name} value={item.name}>
                                        <em>{item.name}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Label>Data de Lançamento:</Label>
                        <DatePicker
                            type="date"
                            name="releasedInMusicInput"
                            value={form.releasedInMusicInput}
                            onChange={handleInputChange}
                        />
                    </ThemeProvider>
                    <CreateMusic
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                        onClick={createMusic}>
                        Criar
                    </CreateMusic>
                </FormContainerMusic>
                <Title onClick={expandMoreAlbum}>Lançar Álbum <ExpandMoreIcon /></Title>
                <FormContainerAlbum expand={expandAlbum} autocomplete="false" className={classes.root} noValidate>
                    <ThemeProvider theme={theme}>
                        <TextField
                            className={classes.margin}
                            label="Nome"
                            variant="filled"
                            name="nameAlbumInput"
                            value={form.nameAlbumInput}
                            onChange={handleInputChange}
                        />
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                name="genreInput"
                                value={form.genreInput}
                                onChange={handleInputChange}>
                                {genres.map(item => (
                                    <MenuItem key={item.id} value={item.id}>
                                        <em>{item.name}</em>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Label>Data de Lançamento:</Label>
                        <DatePicker
                            type="date"
                            name="releasedInAlbumInput"
                            value={form.releasedInAlbumInput}
                            onChange={handleInputChange}
                        />
                    </ThemeProvider>
                    <CreateMusic
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                        onClick={createAlbum}>
                        Criar
                    </CreateMusic>
                </FormContainerAlbum>
            </MainContainer>
            {navType()}
        </Container>
    )
}
export default Release