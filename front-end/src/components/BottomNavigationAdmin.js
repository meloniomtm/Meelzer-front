import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';


const ContainerFooter = styled.div`
grid-row: 3/4;
background-color: #00000000;
border-top: 1px solid #0000001e;
display:flex;
justify-content: center;
align-items:center;
width:100%;
height: 10vh;
position: sticky;
bottom: 0;
box-shadow: inset 1px 5px 20px 1px #0000002b;
`

const Button = styled(IconButton)`
&&{
    color: white;
    margin: 5vw;

}
`

const BottomNavigationAdmin = () => {
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
                    <AddIcon
                        style={{ fontSize: 35 }} />
                </Button>
                <Button onClick={goToProfile}>
                    <PersonIcon
                        style={{ fontSize: 35 }} />
                </Button>
            </ContainerFooter>
    )
}

export default BottomNavigationAdmin;