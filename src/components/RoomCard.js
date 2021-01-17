import React, { useState, useCallback, useLayoutEffect } from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import { useFirebase } from "../contexts/FirebaseContext";

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 15px;
  overflow: hidden;
  padding: 30px;
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.5);
  transition: 0.35s transform, 0.35s box-shadow, 0.35s opacity;
  opacity: 0.85;
  &:hover {
    opacity: 1;
    transform: translateY(-8px);
    box-shadow: 0px 6px 25px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

const CardFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    305deg,
    ${colors.darkBlue} 0%,
    ${colors.lightBlue} 100%
  );
  opacity: 0.6;
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
  font-size: 0.9rem;
`;

const CardEntryValue = styled.span`
  color: ${colors.textPrimary};
  font-size: 1.2em;
  font-family: ${fonts.secondaryFont};
`;

const CardEntryValueLink = styled.a`
  text-decoration: none;
  color: ${colors.lightBlue};
  font-size: 1.2em;
  font-family: ${fonts.secondaryFont};
  transition: 0.15s color;

  &:hover {
    color: ${colors.highlightBlue};
  }
`;

const IconContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const CardIcon = styled.i`
  color: ${colors.textPrimary};
  display: flex;
  font-size: 1.3rem;
  width: auto;
  transition: 0.15s color;
  margin: 0 5px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`;

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
  padding: 30px;
  background-color: ${colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 2px 25px 6px rgba(0, 0, 0, 0.8);
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
  transition: 0.15s opacity, 0.15s background-color;

  &:hover {
    opacity: 1;
    background-color: ${colors.lightBlue};
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const InputLabel = styled.label`
  color: ${colors.textSecondary};
  font-family: ${fonts.primaryFont};
  font-size: 1.3rem;
`;

const TextInput = styled.input`
  background: none;
  border: none;
  background-color: ${colors.backgroundBlue};
  padding: 15px;
  outline: none;
  color: ${colors.textPrimary};
  font-family: ${fonts.secondaryFont};
  border-radius: 5px;
`;

const RoomCard = ({ isOwner, user, room }) => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const { id, name, isPublic, mood, moodMessage, linkClicks } = room;
  const [modalOpen, setModalOpen] = useState(false);
  const [roomPassword, setRoomPassword] = useState("");
  const [unlocked, setUnlocked] = useState(isPublic);

  const escapeModal = useCallback((event) => {
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

  const checkPassword = () => {
    if (roomPassword === room.password) {
      setUnlocked(true);
    } else {
      alert("Sorry, that was not the super secret password!");
    }
  };

  const handleLockToggle = async () => {
    await db
      .collection("rooms")
      .doc(id)
      .update({
        isPublic: !isPublic,
      })
      .catch((error) => {
        alert(`Error: Failed to update room access.\n\nError: ${error}`);
      });
  };
  const handleLinkClick = async () => {
    await db
      .collection("rooms")
      .doc(id)
      .update({
        linkClicks: linkClicks + 1,
      })
      .catch((error) => {
        alert(`Error: Failed to update room access.\n\nError: ${error}`);
      });
  };

  const handleDeleteEvent = async (e) => {
    e.stopPropagation();
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events/${id}`,
      requestOptions
    ).catch(function (error) {
      alert(`Error: Failed to delete event from calendar\n\nError: ${error}`);
    });
    await db
      .collection("rooms")
      .doc(id)
      .delete()
      .then(function () {})
      .catch(function (error) {
        alert(`Error: Failed to delete room from database\n\nError: ${error}`);
      });
  };

  return (
    <>
      <CardWrapper onClick={() => setModalOpen(true)}>
        <CardFill />
        <CardEntry>
          <CardEntryTitle>ROOM NAME</CardEntryTitle>
          <CardEntryValue>{name}</CardEntryValue>
        </CardEntry>
        <CardEntry>
          <CardEntryTitle>MOOD</CardEntryTitle>
          <CardEntryValue>{mood}</CardEntryValue>
        </CardEntry>
        <CardEntry>
          <CardEntryTitle>MOOD MESSAGE</CardEntryTitle>
          <CardEntryValue>{moodMessage}</CardEntryValue>
        </CardEntry>
        <CardEntry>
          <CardEntryTitle>CLICKS</CardEntryTitle>
          <CardEntryValue>{linkClicks}</CardEntryValue>
        </CardEntry>
        <IconContainer>
          {isOwner && (
            <CardIcon
              className="fas fa-trash-alt"
              onClick={handleDeleteEvent}
              hoverColor={colors.red}
            />
          )}
          <CardIcon
            className={`fas fa-${isPublic ? "lock-open" : "lock"}`}
            onClick={(e) => {
              e.stopPropagation();
              if (isOwner) {
                handleLockToggle();
              }
            }}
            hoverColor={isOwner ? colors.highlightBlue : colors.textPrimary}
          />
        </IconContainer>
      </CardWrapper>
      {modalOpen && (
        <ModalWrapper onClick={() => setModalOpen(false)}>
          <UserInfoModal onClick={(e) => e.stopPropagation()}>
            {(isPublic || unlocked) && (
              <CardEntry>
                <CardEntryTitle>Study Room Link</CardEntryTitle>
                <CardEntryValueLink onClick={handleLinkClick} href={room.hangoutLink} target={"_blank"}>
                  Click here to join the study room!
                </CardEntryValueLink>
              </CardEntry>
            )}
            {!isPublic && !unlocked && (
              <CardEntry>
                <CardEntryValue>
                  Looks like this room is private. Try asking the host for the
                  room's super secret password!
                </CardEntryValue>
                <InputWrapper>
                  <InputLabel htmlFor={"new-room-name"} type="text">
                    Room Password
                  </InputLabel>
                  <TextInput
                    id={"new-room-name"}
                    type="text"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                  />
                </InputWrapper>
                <SubmitButton onClick={checkPassword}>
                  Join Study Room
                </SubmitButton>
              </CardEntry>
            )}
          </UserInfoModal>
        </ModalWrapper>
      )}
    </>
  );
};

export default RoomCard;
