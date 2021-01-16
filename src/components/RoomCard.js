import React from "react";
import styled from "styled-components";
import { colors } from "../defaultStyles";

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 15px;
  overflow: hidden;
  padding: 25px;
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.5);
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
`;

const CardEntryValue = styled.span`
  color: ${colors.textPrimary};
  font-size: 1.05em;
`;

const CardActions = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const JoinButton = styled.button`
  z-index: 1;
  outline: none;
  border: none;
  color: ${colors.textPrimary};
  background: none;
  opacity: 0.75;
  font-size: 1.1em;
  padding: 6px 18px;
  border-radius: 5px;
  border: 2px solid ${colors.textPrimary};
  transition: 0.2s opacity, 0.2s color, 0.2s background-color;

  &:hover {
    opacity: 0.9;
    background-color: ${colors.textPrimary};
    color: ${colors.darkBlue};
    border-bottom: 2px solid ${colors.textPrimary};
    cursor: pointer;
  }
`;

const RoomCard = ({ roomName, isPublic, mood }) => {
  return (
    <CardWrapper>
      <CardFill />
      <CardEntry>
        <CardEntryTitle>ROOM NAME</CardEntryTitle>
        <CardEntryValue>{roomName}</CardEntryValue>
      </CardEntry>
      <CardEntry>
        <CardEntryTitle>ACCESS</CardEntryTitle>
        <CardEntryValue>{isPublic ? "private" : "public"}</CardEntryValue>
      </CardEntry>
      <CardEntry>
        <CardEntryTitle>MOOD</CardEntryTitle>
        <CardEntryValue>{mood}</CardEntryValue>
      </CardEntry>
      <CardActions>
        <JoinButton>{isPublic ? "Join Room" : "Request to Join"}</JoinButton>
      </CardActions>
    </CardWrapper>
  );
};

export default RoomCard;
