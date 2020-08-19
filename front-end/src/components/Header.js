import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import SettingsIcon from '@material-ui/icons/Settings';

import Drawer from './Drawer'

const ContainerHeader = styled.div`
grid-row: 1/2;
box-shadow: inset 0 0 20px 3px #00000012;
background-color:#00000000;
border-bottom: 1px solid #0000001e;
display:grid;
z-index: 1;
grid-template-columns: repeat(3, 1fr);
width:100%;
height: 10vh;
position: sticky;
top: 0;
padding:1vw;
padding-left: 5vw;
padding-right: 2vw;
justify-items: start;
align-items: center;
font-size:  0;
font-size: 1.2em;
font-weight: bold;
`

const SettingIconContainer = styled.div`
grid-column: 3/4;
display:flex;
justify-content: flex-end;
width: 100%;
padding-right: 2vw;
`
const Header = () => {
    return (
        <ContainerHeader>
            <SettingIconContainer>
                <SettingsIcon />
            </SettingIconContainer>
        </ContainerHeader>
    )
}
export default Header;