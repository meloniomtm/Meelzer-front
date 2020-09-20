import React from 'react'
import styled from 'styled-components';
import '../App.css'
import { useHistory } from "react-router-dom";

const Container = styled.div`
display:flex;
flex-direction: column;
justify-content:space-between;
align-items:center;
width:40vw;
height:fit-content;
margin-bottom: 5vw;
font-family: 'MuseoModerno', cursive;
@media(min-width: 500px) {
    width:25vw;
    height:fit-content;
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
width:100%;
height:40vw;
border-radius: 100px;
object-fit: cover;
object-position: center;
@media(min-width: 500px) {
    height:25vw;
  }
  @media(min-width: 800px) {
    height:20vw;
  }
  @media(min-width: 1500px) {
    height:15vw;
  }
`

const Title = styled.h3`
font-size: 1.5em;
text-shadow: 0 0 5px black;
`
const CardArtist = (props) => {
  const history = useHistory()

  const goToArtist = (id) => {
    history.push(`artist/${id}`)
  }
  return (
    <>
      <Container onClick={() => { goToArtist(props.artist.id) }}>
        <Image src={props.artist.image ? (props.artist.image) : ('https://images.unsplash.com/photo-1453090927415-5f45085b65c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1462&q=80')}></Image>
        <Title>{props.artist.name}</Title>
      </Container>
    </>
  )
}
export default CardArtist;