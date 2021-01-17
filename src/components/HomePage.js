import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import mountain_first from "../images/mountain-first.jpg";
import main_logo from "../images/mtnside-logo-white.png";
const PageWrapper = styled.div`
  padding: 150px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const TitleLabel = styled.span`
  font-family: ${fonts.secondaryFont};
  color: ${colors.textPrimary};
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1em;
`;
const Paragraph = styled.p`
  font-family: ${fonts.primaryFont};
  color: ${colors.textSecondary};
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 1px;
  line-height: 1.6rem;
`;

const HeroWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 1300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colors.textPrimary};
`;

const BackImage = styled.img`
  position: absolute;
  display: flex;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.35;
`;

const MainImage = styled.img`
  position: relative;
  z-index: 1;
  display: flex;
  object-fit: cover;
  width: 1200px;
  height: auto;
`;

const NavLinkWrapper = styled.div`
  margin-top: 20px;
  & > a {
    text-decoration: none;
    text-transform: uppercase;
    font-family: ${fonts.primaryFont};
    padding: 12px 18px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: ${colors.textPrimary};
    background-color: ${colors.lightBlue};
    opacity: 0.9;
    transition: 0.2s background-color, 0.2s opacity;
    &:hover {
      opacity: 1;
      background-color: 1px solid ${colors.highlightBlue};
    }
  }
`;

const NavLink = ({ to, children }) => {
  return (
    <NavLinkWrapper>
      <Link to={to}>{children}</Link>
    </NavLinkWrapper>
  );
};

const HomePage = () => {
  return (
    <PageWrapper>
      <HeroWrapper>
        <BackImage src={mountain_first} />
        <MainImage src={main_logo} />
      </HeroWrapper>
      <Paragraph>
        One of the pillars of the University is the library - a central place
        for education, collaboration, and study. At UCSB, there is only one
        library - the Davidson Library. With 8 stories and with stunning views
        of both the mountains and the ocean from its upper floors, one cannot
        miss the library. Due to its central location, the library is a definite
        part of any student’s academic journey, providing study rooms and ample
        study space for collaboration, socialization, and work.
      </Paragraph>
      <Paragraph>
        The second floor of the library is often bustling with students
        throughout the day. One of the main features of the second floor is the
        presence of a large cluster of study rooms towards the Northern
        (Mountain Side) side. Open 24/7 during typical University hours, the
        study rooms provide a place for students to work together and socialize.
      </Paragraph>
      <Paragraph>
        Mountain Side is a web app that tries to bring back that same atmosphere
        as an online library workspace. Online meetings are the modern study
        room that makes it possible to connect and study with others safely. You
        can bring your friends and create a study room or you can find a new
        group grinding out for the upcoming midterm.
      </Paragraph>
      <Paragraph>
        Whatever it is, the next step should be toward the Mountain Side!
      </Paragraph>
      <NavLink to={"/rooms"}>Head over to the Study Rooms</NavLink>
    </PageWrapper>
  );
};

export default HomePage;
