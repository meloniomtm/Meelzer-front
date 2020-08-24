import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'
import CardGenre from '../../components/CardGenre'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import '../../App.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
            color: '#5cb646',
        },

    },
    loading: {
        color: '#ffffff',

    }
}));

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

const InputSearch = styled.input`
    width: 100%;
    height: 8%;
    margin-bottom: 10vw;
    border-radius: 100vw;
    padding-left: 5vw;
    border: 0px black solid;
    box-shadow: 0 0 20px 2px #000000;
    background-color: #ffffff;
    outline: none;
    font-size: 1.1em;
`

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Search = () => {
    const token = localStorage.getItem('token')
    const history = useHistory()
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)
    const classes = useStyles();

    let urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"

    const navType = () => {
        const accountType = localStorage.getItem('accountType')
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
        setLoading(true)
        axios.get(`${urlBack}/genre/getAllGenre`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setGenres(response.data.genre)
            setLoading(false)
        }).catch(error => {
            if (error.response.data.error === "jwt expired") {
                alert("Sua sessão expirou!")
                goToLogin()
            }
            console.log(error.response.data.error)
            setLoading(false)
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

    return (
        <Container>
            {loading ?
                (<LoadingContainer><CircularProgress className={classes.loading} /></LoadingContainer>) :
                (
                    <MainContainer>
                        <Title>Buscar</Title>
                        <InputSearch placeholder='Buscar por música, artista, álbum...'></InputSearch>
                        {genres.map(item => {
                            return (<CardGenre key={item.name} genre={item} ></CardGenre>)
                        })}
                    </MainContainer>
                )}

            {navType()}
        </Container>
    )
}
export default Search