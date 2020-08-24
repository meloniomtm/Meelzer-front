import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';


const ContainerFooter = styled.div`
grid-row: 3/4;
background-color: #525252;
border-top: 1px solid #0000001e;
display:flex;
justify-content: center;
align-items:center;
width:100%;
height: 10vh;
position: fixed;
bottom: 0;
box-shadow: inset 1px 5px 20px 1px #0000002b;
z-index: 1;
`

const Button = styled(IconButton)`
&&{
    color: white;
    margin: 5vw;

}
`

const BottomNavigationUser = () => {
    const history = useHistory();

    const goToHome = () => {
        history.push("/home");
    }
    const goToCart = () => {
        history.push("/cart");
    }
    const goToProfile = () => {
        history.push("/profile");
    }

    return (
            <ContainerFooter>
                <Button onClick={goToHome}>
                    <HomeIcon
                        style={{ fontSize: 35 }} />
                </Button>
                <Button onClick={goToCart}>
                    <SearchIcon
                        style={{ fontSize: 35 }} />
                </Button>
                <Button onClick={goToProfile}>
                    <LibraryMusicIcon
                        style={{ fontSize: 35 }} />
                </Button>
            </ContainerFooter>
    )
}

export default BottomNavigationUser;