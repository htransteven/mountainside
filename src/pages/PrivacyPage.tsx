import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";

const PageWrapper = styled.div`
  padding: 10vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
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

const TitleLabel = styled.span`
  font-family: ${fonts.primaryFont};
  color: ${colors.lightBlue};
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1em;
  margin-bottom: 1.5rem;
`;

const PrivacyPage = () => {
  return (
    <PageWrapper>
      <TitleLabel>Privacy Page</TitleLabel>
      <Paragraph>
        Mountain Side began as a hackathon project but has the potential to be
        so much more. This app requires your data and permission to
        create/edit/delete Google Calendar events which are used to indirectly
        generate Google Meet conferences. We provide an option to delete your
        account from our database and will soon implement a recursive function
        that deletes all of your "study rooms" upon account deletion. When
        creating a 'study room', our app creates an event in your Google
        Calendar and takes the google conference meeting from that event and
        stores it in our database.
      </Paragraph>
    </PageWrapper>
  );
};

export default PrivacyPage;
