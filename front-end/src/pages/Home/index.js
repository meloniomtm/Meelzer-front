import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'

import Header from '../../components/Header'

import '../../App.css'


const Container = styled.div`
width: 100%;
height: 100vh;
display:grid;
grid-template-rows: 10fr 80fr 10fr;
max-height: 100vh;
background-color: #000000ad;
color: white;
overflow: hidden;
`




const MainContainer = styled.div`
grid-row: 2/3;
background-color: #00000047;
`

const Welcome = styled.p`
width: 100%;
font-size: 2em;
margin-left: 5vw;
font-family: 'MuseoModerno', cursive;
`




const Home = () => {
    const [welcomePhrase, setWelcomePhrase] = useState(0)

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

        const accountType = localStorage.getItem('accountType')
        if (accountType === "FREE" || accountType === "PAYING"){
            return <BottomNavigationUser></BottomNavigationUser>
        }
        if (accountType === "ADMIN"){
            return <BottomNavigationAdmin></BottomNavigationAdmin>
        }
        if (accountType === "ARTIST"){
            return <BottomNavigationArtist></BottomNavigationArtist>
        }
    }

    useEffect(() => {
        welcomeFunction()
    }, []);


    return (
        <Container>
            <Header></Header>
            <MainContainer>
                <Welcome>{welcomePhrase}</Welcome>
            </MainContainer>
            {/* <BottomNavigationUser></BottomNavigationUser> */}
            {/* <BottomNavigationArtist></BottomNavigationArtist> */}
            {navType()}
        </Container>
    )
}
export default Home