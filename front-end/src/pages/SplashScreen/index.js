import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import Meelzer_logo2 from '../../images/Meelzer_logo2.png'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
`

const Title = styled.h1`
    color:white;
    margin-bottom: -12px;
    font-size: 3em;
    font-weight: normal;
    font-family: 'MuseoModerno', cursive;
`

const SplashScreen = () => {
    const history = useHistory();
    setTimeout(() => {
        history.push("/login")
      }, 2000);
    return (
        <Container>
            <div>
                <img src={Meelzer_logo2}></img>
            </div>
        </Container>
    )
}
export default SplashScreen