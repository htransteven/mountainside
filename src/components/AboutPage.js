import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import moises from "../images/moises.jpg";
import shivam from "../images/shivam.png";
import steven from "../images/steven.jpg";

const PageWrapper = styled.div`
  padding: 150px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  grid-gap: 10px 30px;
`;

const PersonPhoto = styled.img`
  display: flex;
  object-fit: cover;
  height: 350px;
  width: 300px;
`;

const Name = styled.span`
  font-family: ${fonts.secondaryFont};
  color: ${colors.textPrimary};
  font-size: 1.6rem;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: ${colors.lightBlue};
  font-size: 1.2em;
  font-family: ${fonts.secondaryFont};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s color;

  &:hover {
    color: ${colors.highlightBlue};
  }
`;

const SubTitle = styled.span`
  font-family: ${fonts.primaryFont};
  color: ${colors.textSecondary};
  font-size: 1.3rem;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
`;

const Icon = styled.i`
  display: flex;
  font-size: 1.3rem;
  width: auto;
  margin-right: 10px;
`;

const AboutPage = () => {
  return (
    <PageWrapper>
      <PhotoGrid>
        <PersonPhoto src={steven} />
        <PersonPhoto src={shivam} />
        <PersonPhoto src={moises} />
        <Name>Steven Huynh-Tran</Name>
        <Name>Shivam Misra</Name>
        <Name>Moises Gutierrez</Name>
        <SubTitle>UC Santa Barbara '22</SubTitle>
        <SubTitle>UC Santa Barbara '22</SubTitle>
        <SubTitle>UC Santa Barbara '22</SubTitle>
        <SocialLink href={"https://linkedin.com/in/stevenht"} target={"_blank"}>
          <Icon className={"fab fa-linkedin"} />
          LinkedIn
        </SocialLink>
        <SocialLink
          href={"https://linkedin.com/in/shivammisra2000"}
          target={"_blank"}
        >
          <Icon className={"fab fa-linkedin"} />
          LinkedIn
        </SocialLink>
        <SocialLink
          href={"https://linkedin.com/in/moisesgtz"}
          target={"_blank"}
        >
          <Icon className={"fab fa-linkedin"} />
          LinkedIn
        </SocialLink>
      </PhotoGrid>
    </PageWrapper>
  );
};

export default AboutPage;
