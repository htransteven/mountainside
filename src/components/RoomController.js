import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fonts, colors } from "../defaultStyles";

import RoomCard from "./RoomCard";

const RoomsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TitleLabel = styled.span`
  font-family: ${fonts.secondaryFont};
  color: ${colors.textPrimary};
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1em;
`;

const ActionButton = styled.button`
  z-index: 1;
  outline: none;
  border: none;
  color: ${colors.textPrimary};
  background: none;
  opacity: 0.75;
  margin-left: 20px;
  font-size: 1.1em;
  padding: 3px 12px;
  border-radius: 5px;
  line-height: 1em;
  border: 2px solid ${colors.lightBlue};
  transition: 0.2s opacity, 0.2s color, 0.2s background-color;

  &:hover {
    opacity: 0.9;
    background-color: ${colors.textPrimary};
    color: ${colors.darkBlue};
    border-bottom: 2px solid ${colors.textPrimary};
    cursor: pointer;
  }
`;

const RoomController = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // get all available rooms from firestore
    setRooms([
      { roomName: "Steven's Room", isPublic: true, mood: "Grinding" },
      { roomName: "Shivam's Room", isPublic: false, mood: "Amazon who?" },
      { roomName: "Moises's Room", isPublic: true, mood: "I'm ..." },
    ]);
  }, []);

  const createRoom = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        end: {
          date: "",
        },
        start: {
          date: "",
        },
        conferenceData: {
          createRequest: {
            requestId: "",
          },
        },
      }),
    };
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?conferenceDataVersion=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data)); // make api call to create room
    // get room id
  };
  return (
    <>
      <TitleWrapper>
        <TitleLabel>Study Rooms</TitleLabel>
        <ActionButton>Create Room</ActionButton>
      </TitleWrapper>
      <RoomsWrapper>
        {rooms.map((room) => (
          <RoomCard {...room} />
        ))}
      </RoomsWrapper>
    </>
  );
};

export default RoomController;
