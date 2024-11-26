import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { NavLink } from 'react-router-dom'

const Box = styled(motion.div)`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 65vw;
height:55vh;
display: flex;

background: linear-gradient(
    to right,
    ${props => props.theme.body} 50%,
    ${props => props.theme.text} 50%) bottom,
    linear-gradient(
    to right,
    ${props => props.theme.body} 50%,
    ${props => props.theme.text} 50%) top;
    background-repeat: no-repeat;
background-size: 100% 2px;
    border-left: 2px solid ${props => props.theme.body};
    border-right: 2px solid ${props => props.theme.text};

    z-index:1;
`

const SubBox = styled.div`
width: 50%;
position: relative;
display: flex;
`

const Text = styled.div`
font-size: calc(1em + 1.5vw);
color: ${props => props.theme.body};
padding: 2rem;
cursor: pointer;

display: flex;
flex-direction: column;
justify-content: space-evenly;

&>*:last-child{
    color: ${props => `rgba(${props.theme.bodyRgba},0.6)` };
    font-size: calc(0.5rem + 1.5vw);
    font-weight:300;
}
`

const RightSection = styled(SubBox)`
display: flex;
justify-content: center;
align-items: center;
`

const WorkButton = styled(motion(NavLink))`
padding: 0.8rem 2rem;
background-color: ${props => props.theme.text};
color: ${props => props.theme.body};
border: none;
border-radius: 4px;
font-size: 1.2rem;
font-weight: 600;
text-decoration: none;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
    background-color: ${props => `rgba(${props.theme.textRgba},0.9)`};
}
`

const Intro = () => {
    return (
        <Box
        initial={{height:0}}
        animate={{height: '55vh'}}
        transition={{ type: 'spring', duration:2, delay:1 }}
        >
            <SubBox>
                <Text>
                    <h1>Hi,</h1>
                    <h3>This is SFU Toolbox.</h3>
                    <h6>Praesent finibus purus non sem tempor, in condimentum massa efficitur. Mauris sollicitudin enim.</h6>
                </Text>
            </SubBox>
            <RightSection>
                <WorkButton 
                    to="/work"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Check Out the Tools
                </WorkButton>
            </RightSection>
        </Box>
    )
}

export default Intro
