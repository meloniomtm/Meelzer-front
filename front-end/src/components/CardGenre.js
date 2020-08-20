import React from 'react'
import styled from 'styled-components';
import '../App.css'
const Container = styled.div`
background: url(${props => props.background});
text-shadow: 0 0 20px black, 0 0 20px black;
background-position: center;
background-size: cover;
background-repeat: no-repeat;
width:40vw;
height:40vw;
display:flex;
justify-content: center;
align-items: center;
margin-bottom: 5vw;
box-shadow: 0px 0px 9px 1px #0000006b;
font-family: 'MuseoModerno', cursive;
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
const CardGenre = (props) => {
    return (
        <>
            <Container background={props.genre.image}>
                <Title>{props.genre.name}</Title>
            </Container>
        </>
    )
}
export default CardGenre;