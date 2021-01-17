import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import styled from "styled-components";
import { fonts, colors } from "../defaultStyles";

import RoomCard from "./RoomCard";
import NewRoomMenu from "./NewRoomMenu";

import { useFirebase } from "../contexts/FirebaseContext";

const RoomsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  width: 100%;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const TitleLabel = styled.span`
  font-family: ${fonts.secondaryFont};
  color: ${colors.textPrimary};
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1em;
`;

const ActionButton = styled.button`
  outline: none;
  border: none;
  color: ${colors.textPrimary};
  background: none;
  opacity: 0.85;
  margin-left: 20px;
  font-size: 1.1em;
  padding: 3px 12px;
  border-radius: 5px;
  line-height: 1em;
  border: 2px solid ${colors.lightBlue};
  transition: 0.2s opacity, 0.2s color, 0.2s background-color;

  &:hover {
    opacity: 1;
    background-color: ${colors.lightBlue};
    color: ${colors.textPrimary};
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

const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: ${colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 2px 25px 6px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const RoomController = ({ user }) => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const [rooms, setRooms] = useState([]);
  const [myRooms, setMyRooms] = useState([]);

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

  useEffect(() => {
    // get all available rooms from firestore
    db.collection("rooms").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const docData = change.doc.data();
        if (change.type === "added") {
          setRooms((prev) => {
            const copy = [...prev];
            copy.push(docData);
            return copy;
          });
          if (docData.host === user.email) {
            setMyRooms((prev) => {
              const copy = [...prev];
              copy.push(docData);
              return copy;
            });
          }
        } else if (change.type === "modified") {
          setRooms((prev) => {
            const copy = [...prev];
            const index = copy.findIndex((room) => room.id === docData.id);
            copy[index] = docData;
            return copy;
          });

          if (docData.host === user.email) {
            setMyRooms((prev) => {
              const copy = [...prev];
              const index = copy.findIndex((room) => room.id === docData.id);
              copy[index] = docData;
              return copy;
            });
          }
        } else if (change.type === "removed") {
          setRooms((prev) => {
            const copy = [...prev];
            return copy.filter((room) => room.id !== docData.id);
          });

          if (docData.host === user.email) {
            setMyRooms((prev) => {
              const copy = [...prev];
              return copy.filter((room) => room.id !== docData.id);
            });
          }
        }
      });
    });
  }, [db, user.email]);

  return (
    <>
      <TitleWrapper>
        <TitleLabel>Your Rooms</TitleLabel>
        <ActionButton onClick={() => setModalOpen(true)}>
          Create Room
        </ActionButton>
      </TitleWrapper>
      <RoomsWrapper>
        {myRooms.map((room) => (
          <RoomCard room={room} isOwner={true} user={user} />
        ))}
      </RoomsWrapper>
      <TitleWrapper>
        <TitleLabel>All Study Rooms</TitleLabel>
      </TitleWrapper>
      <RoomsWrapper>
        {rooms.map((room) => (
          <RoomCard room={room} user={user} />
        ))}
      </RoomsWrapper>
      {modalOpen && (
        <ModalWrapper onClick={() => setModalOpen(false)}>
          <ModalContentWrapper onClick={(e) => e.stopPropagation()}>
            <NewRoomMenu user={user} onSubmit={() => setModalOpen(false)} />
          </ModalContentWrapper>
        </ModalWrapper>
      )}
    </>
  );
};

export default RoomController;
