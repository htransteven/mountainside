import React, { useState, useLayoutEffect, useCallback } from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";

const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

const HelloWrapper = styled.span`
  font-family: ${fonts.secondaryFont};
  color: ${colors.textPrimary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HelloName = styled(HelloWrapper)`
  color: ${colors.lightBlue};
  margin: 0;
  transition: 0.1s color;

  &:hover {
    color: ${colors.highlightBlue};
    cursor: pointer;
  }
`;

const HelloUser = ({ name, onClick }) => {
  return (
    <HelloWrapper>
      Welcome back, <HelloName onClick={onClick}>{name}</HelloName>!
    </HelloWrapper>
  );
};

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.85);
`;

const UserInfoModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 850px;
  padding: 30px;
  background-color: ${colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 2px 25px 6px rgba(0, 0, 0, 0.8);
`;

const CardEntry = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 1;

  margin: 5px 0;

  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CardEntryTitle = styled.span`
  color: ${colors.textSecondary};
  margin-bottom: -2px;
  font-family: ${fonts.primaryFont};
  font-size: 1.1rem;
`;

const CardEntryValue = styled.span`
  color: ${colors.textPrimary};
  font-size: 1.35em;
  font-family: ${fonts.secondaryFont};
`;

const UserInfo = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const escapeModal = useCallback((event) => {
    console.log(event);
    if (event.keyCode === 27) {
      setModalOpen(false);
    }
  }, []);

  useLayoutEffect(() => {
    if (modalOpen) {
      window.addEventListener("keydown", escapeModal);
    }

    return () => {
      window.removeEventListener("keydown", escapeModal);
    };
  }, [modalOpen, escapeModal]);

  return user ? (
    <InfoWrapper>
      <HelloUser name={user.first_name} onClick={() => setModalOpen(true)} />
      {modalOpen && (
        <ModalWrapper onClick={() => setModalOpen(false)}>
          <UserInfoModal onClick={(e) => e.stopPropagation()}>
            <CardEntry>
              <CardEntryTitle>Email</CardEntryTitle>
              <CardEntryValue>{user.email}</CardEntryValue>
            </CardEntry>
          </UserInfoModal>
        </ModalWrapper>
      )}
    </InfoWrapper>
  ) : (
    <></>
  );
};

export default UserInfo;
