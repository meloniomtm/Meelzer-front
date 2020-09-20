import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import Meelzer_logo2 from '../../images/Meelzer_logo2.png'

import FavoriteIcon from '@material-ui/icons/Favorite';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: left;
    max-height: 100vh;
`

const Filter = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    position:absolute;
    background-image: linear-gradient(#ffffffd9, #7575756b, #000000c7);
`
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
    margin-top: 15vh;
    margin-bottom: 11vw;
    @media(min-width: 800px) {

  }
`

const Logo = styled.img`
    width:60vw;
    z-index: 1;
    max-width: 240px;
`
const PhraseContainer = styled.span`
color:white;
z-index:1;
display:flex;
position: relative;
bottom: 0;
width: 100%;
justify-content: center;
align-items: center;

@media(min-width: 800px) {
    font-size: 1.5em;
  }

`
const Phrase = styled.span`
z-index:1;
margin-left:1vw;
margin-right:1vw;

`

const SplashScreen = () => {
    const history = useHistory();
    setTimeout(() => {
        history.push("/login")
    }, 4000);
    return (
        <Container className='animation-gradient'>
            <Filter></Filter>
            <LogoContainer>
                <Logo className='beat-logo' src={Meelzer_logo2}></Logo>
            </LogoContainer>
            <PhraseContainer>
                <Phrase>Developed with</Phrase><FavoriteIcon /><Phrase>by Melissa Tammy</Phrase>

            </PhraseContainer>
        </Container>
    )
}
export default SplashScreen