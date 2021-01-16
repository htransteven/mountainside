import React, { useState, useEffect } from "react";
import styled from "styled-components";

import RoomCard from "./RoomCard";

const RoomsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
`;

const RoomController = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // get all available rooms from firestore
    setRooms([
      { roomName: "room 1", isPublic: true, mood: "chilling" },
      { roomName: "room 2", isPublic: false, mood: "grinding" },
      { roomName: "room 3", isPublic: true, mood: "help pls CS gods" },
    ]);
  }, []);
  return (
    <RoomsWrapper>
      {rooms.map((room) => (
        <RoomCard {...room} />
      ))}
    </RoomsWrapper>
  );
};

export default RoomController;
