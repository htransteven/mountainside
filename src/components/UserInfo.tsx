import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
} from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import { useFirebase } from "../contexts/FirebaseContext";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

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

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.85);
`;

const UserInfoModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const SubmitButton = styled.button`
  outline: none;
  border: none;
  color: ${colors.textPrimary};
  font-size: 1.1em;
  padding: 6px 12px;
  border-radius: 5px;
  width: 100%;
  opacity: 0.85;
  background-color: ${colors.lightBlue};
  color: ${colors.textPrimary};
  margin-top: 1rem;
  transition: 0.15s opacity, 0.15s background-color;

  &:hover {
    opacity: 1;
    background-color: ${colors.lightBlue};
    cursor: pointer;
  }
`;

const UserInfo = () => {
  const browserHistory = useHistory();
  const firebase = useFirebase();
  const user = useContext(UserContext);
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

  const handleAccountDelete = async () => {
    var userFirestore = firebase.auth().currentUser;
    userFirestore
      ?.delete()
      .then(() => {
        browserHistory.push("/");
      })
      .catch((error) => {
        alert(
          `An error occured when trying to delete your account. Please try again.\n\nError: ${error}`
        );
      });
  };

  return user ? (
    <InfoWrapper>
      <HelloWrapper>
        Welcome back,{" "}
        <HelloName onClick={() => setModalOpen(true)}>
          {user.firstName}
        </HelloName>
        !
      </HelloWrapper>
      {modalOpen && (
        <ModalWrapper onClick={() => setModalOpen(false)}>
          <UserInfoModal onClick={(e) => e.stopPropagation()}>
            <CardEntry>
              <CardEntryTitle>Name</CardEntryTitle>
              <CardEntryValue>
                {user.firstName} {user.lastName}
              </CardEntryValue>
            </CardEntry>
            <CardEntry>
              <CardEntryTitle>Email</CardEntryTitle>
              <CardEntryValue>{user.email}</CardEntryValue>
            </CardEntry>
            <CardEntry>
              <CardEntryTitle>Last Seen</CardEntryTitle>
              <CardEntryValue>{user.lastSeen.toString()}</CardEntryValue>
            </CardEntry>
            <SubmitButton onClick={handleAccountDelete}>
              Delete Account
            </SubmitButton>
          </UserInfoModal>
        </ModalWrapper>
      )}
    </InfoWrapper>
  ) : (
    <></>
  );
};

export default UserInfo;
