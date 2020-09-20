import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BottomNavigationUser from '../../components/BottomNavigationUser'
import BottomNavigationArtist from '../../components/BottomNavigationArtist'
import BottomNavigationAdmin from '../../components/BottomNavigationAdmin'
import CardArtist from '../../components/CardArtist'
import { url } from '../../reducers/meelzerReducer'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
align-items: center;
padding-top: 10vh;
overflow: scroll;
overflow-x: hidden;
`

const HeaderArtist = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

const MusicContainer = styled.div`
width: 100%;
height: 8vh;
display: flex;
align-items: center;
border-bottom: 1px #00000080 solid;
box-shadow: inset 0 -2px 20px #00000096;
span{
    margin-left: 5vw;
}
`

const Artist = () => {
    const token = localStorage.getItem('token')
    const history = useHistory()
    const [welcomePhrase, setWelcomePhrase] = useState(0)
    const [artist, setArtist] = useState({})
    const [music, setMusic] = useState([])
    const params = useParams()

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

    const getMusic = () => {
        axios.get(`${url}/music`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data.result)
            setMusic(response.data.result)
        }).catch(error => {
            try {
                if (error.response.data.error === "jwt expired") {
                    alert("Sua sessão expirou!")
                    goToLogin()
                }
            } catch{ console.log(error.response) }

        })
    }

    const getArtist = () => {
        axios.get(`${url}/artist/${params.id}`, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setArtist(response.data.result)
            getMusic()
        }).catch(error => {
            try {
                if (error.response.data.error === "jwt expired") {
                    alert("Sua sessão expirou!")
                    goToLogin()
                }
            } catch{ console.log(error.response) }

        })
    }


    useEffect(() => {
        console.log("cade?")
        if (!localStorage.getItem('token') && !localStorage.getItem('accountType')) {
            goToLogin()
        }
        getArtist()
        window.scrollTo(0, 1);
    }, []);

    const goToLogin = () => {
        history.push("/login")
    }

    return (
        <Container>
            <MainContainer>
                <HeaderArtist>
                    <CardArtist artist={artist} />
                </HeaderArtist>
                {music.map(item =>{
                    if(item.id_artist === artist.id){
                        return <MusicContainer>
                            <PlayArrowIcon/>
                            <span>{item.name}</span>
                            </MusicContainer>
                    }
                })}
            </MainContainer>
            {navType()}
        </Container>
    )
}
export default Artist