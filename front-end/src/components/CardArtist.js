import React from 'react'
import styled from 'styled-components';
import '../App.css'
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
    return (
        <>
            <Container >
                <Image src={props.artist.image ? (props.artist.image) : ('https://unsplash.com/photos/ojVMh1QTVGY')}></Image>
                <Title>{props.artist.name}</Title>
            </Container>
        </>
    )
}
export default CardArtist;