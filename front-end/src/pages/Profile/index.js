import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'
import CardArtist from '../../components/CardArtist'
import {url} from '../../reducers/meelzerReducer'

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
justify-content: center;
align-items: center;
padding: 5vw;
overflow: scroll;
overflow-x: hidden;
`

const HeaderProfile = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

const Email = styled.h3``

const Profile = () => {
    const token = localStorage.getItem('token')
    const history = useHistory()
    const [welcomePhrase, setWelcomePhrase] = useState(0)
    const [profile, setProfile] = useState({})

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

    const getProfile = () => {
        let accountType = localStorage.getItem('accountType')
        accountType = accountType.toUpperCase()
        if (accountType === "FREE" || accountType === "PAYING" || accountType === "ADMIN") {
            console.log("entrou no user")

            axios.get(`${url}/user/profile`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setProfile(response.data.result)
                console.log(response.data.result)
            }).catch(error => {
                try {
                    if (error.response.data.error === "jwt expired") {
                        alert("Sua sessão expirou!")
                        goToLogin()
                    }
                } catch{ console.log(error.response) }

            })
        }
        if (accountType === "ARTIST") {
            console.log("entrou no artist")

            axios.get(`${url}/artist/profile`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                setProfile(response.data.result)
                console.log(response.data.result)
            }).catch(error => {
                try {
                    if (error.response.data.error === "jwt expired") {
                        alert("Sua sessão expirou!")
                        goToLogin()
                    }
                } catch{ console.log(error.response) }

            })
        }
    }



    useEffect(() => {
        if (!localStorage.getItem('token') && !localStorage.getItem('accountType')) {
            goToLogin()
        }
        getProfile()
        window.scrollTo(0, 1);
    }, []);

    const goToLogin = () => {
        history.push("/login")
    }

    return (
        <Container>
            <MainContainer>
                <HeaderProfile>
                    <CardArtist artist={profile} />
                </HeaderProfile>
                <Email>{profile.email}</Email>
            </MainContainer>
            {navType()}
        </Container>
    )
}
export default Profile