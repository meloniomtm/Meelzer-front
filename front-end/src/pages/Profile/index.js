import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'
import CardGenre from '../../components/CardGenre'

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

const Welcome = styled.p`
width: 100%;
font-size: 2em;
font-family: 'MuseoModerno', cursive;
margin-bottom: 5vw;
`


const Profile = () => {
    const token = localStorage.getItem('token')
    const history = useHistory()
    const [welcomePhrase, setWelcomePhrase] = useState(0)
    const [genres, setGenres] = useState([])

    let urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"
    const welcomeFunction = () => {
        const time = new Date(Date.now()).getHours()
        if (time >= 0 && time <= 3) {
            setWelcomePhrase("Boa Noite!")
        }
        if (time >= 4 && time <= 12) {
            setWelcomePhrase("Bom Dia!")
        }
        if (time >= 13 && time <= 17) {
            setWelcomePhrase("Boa Tarde!")
        }
        if (time >= 18 && time < 25) {
            setWelcomePhrase("Boa Noite!")
        }
    }

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
        axios.get(`${urlBack}/genre/getAllGenre`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setGenres(response.data.genre)
        }).catch(error => {
            if(error.response.data.error === "jwt expired"){
                alert("Sua sessão expirou!")
                goToLogin()
            }
            console.log(error.response.data.error)
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('token') && !localStorage.getItem('accountType')){
            goToLogin()
        }
        welcomeFunction()
        getGenres()
        window.scrollTo(0,1);
    }, []);

    const goToLogin = () => {
        history.push("/login")
    }

    return (
        <Container>

            <MainContainer>
                <Welcome>{welcomePhrase}</Welcome>
                    {genres.map(item => {
                        return (<CardGenre key={item.name} genre={item} ></CardGenre>)
                    })}
            </MainContainer>
            {navType()}
        </Container>
    )
}
export default Profile