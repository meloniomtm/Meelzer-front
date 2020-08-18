import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import '../../App.css'

import SettingsIcon from '@material-ui/icons/Settings';

const Container = styled.div`
width: 100%;
height: 100vh;
display:grid;
grid-template-rows: 10vh 20px 100px;
max-height: 100vh;
background-color: #000000ad;
color: white;
`
const ContainerHeader = styled.div`
box-shadow: inset 0 0 20px 3px #00000012;
background-color:#00000000;
border-bottom: 1px solid #0000001e;
display:grid;
z-index: 1;
grid-template-columns: repeat(3, 1fr);
width:100%;
height: 10vh;
position: sticky;
top: 0;
padding:1vw;
padding-left: 5vw;
padding-right: 2vw;
justify-items: start;
align-items: center;
font-size:  0;
font-size: 1.2em;
font-weight: bold;

`

const SettingIconContainer = styled.div`
grid-column: 3/4;
display:flex;
justify-content: flex-end;
width: 100%;
padding-right: 2vw;
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

    useEffect(() => {
        welcomeFunction()
    }, []);


    return (
        <Container>
            <ContainerHeader>
                <SettingIconContainer>
                    <SettingsIcon />
                </SettingIconContainer>
            </ContainerHeader>
            <Welcome>{welcomePhrase}</Welcome>
        </Container>
    )
}
export default Home