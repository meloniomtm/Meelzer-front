import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import {getArtists} from '../pages/Approve'
import '../App.css'
import CheckIcon from '@material-ui/icons/Check';

const Container = styled.div`
text-shadow: 0 0 20px black, 0 0 20px black;
background-color: #0000005c;
width:100%;
height: 15%;
display:flex;
justify-content: space-between;
align-items: center;
margin-bottom: 5vw;
padding: 5vw;
box-shadow: 0px 0px 9px 1px #0000006b;
font-family: 'MuseoModerno', cursive;
@media(min-width: 500px) {
    width:25vw;
    height:25vw;
  }
  @media(min-width: 800px) {
    width:20vw;
    height:20vw;
  }
  @media(min-width: 1500px) {
    width:15vw;
    height:15vw;
  }
`
const Image = styled.img`
width:40vw;
height:40vw;
object-fit: cover;
object-position: center;
`

const Title = styled.h3`
font-size: 1.5em;
text-shadow: 0 0 5px black;
`



const CardArtistApprove = (props) => {
    const history = useHistory()
    const token = localStorage.getItem('token')
    let urlBack = "https://l3zhapgw20.execute-api.us-east-1.amazonaws.com/dev"

    const approveArtist = (id) => {
        console.log(id)
        console.log(token)
        axios.put(`${urlBack}/artist/approve/${id}`, null, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
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

    const goToLogin = () => {
        history.push("/login")
    }

    return (
        <>
            <Container background={props.artist.image}>
                <Title>{props.artist.name}</Title>
                <CheckIcon onClick={() => approveArtist(props.artist.id)}></CheckIcon>
            </Container>
        </>
    )
}
export default CardArtistApprove;