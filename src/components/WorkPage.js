import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes";
import { motion } from "framer-motion";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";

import { Work } from "../data/WorkData";
import Card from "../subComponents/Card";
import BigTitlte from "../subComponents/BigTitlte";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  height: 400vh;
  position: relative;
  display: flex;
  align-items: center;
`;

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  height: 40vh;
  display: flex;
  color: white;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    }
  }
};

const WorkPage = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollValue = -window.scrollY;
        mainRef.current.style.transform = `translateX(${scrollValue}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />

        <Main
          ref={mainRef}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {Work.map((d) => (
            <Card key={d.id} data={d} />
          ))}
        </Main>

        <BigTitlte text="TOOLS" top="10%" right="20%" />
      </Box>
    </ThemeProvider>
  );
};

export default WorkPage;