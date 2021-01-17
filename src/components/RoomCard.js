import React from "react";
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
  padding: 25px;
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

const CardIcon = styled.i`
  position: absolute;
  color: white;
  top: 25px;
  right: 25px;
  display: flex;
  font-size: 1.3rem;
  width: auto;
  transition: 0.15s color;

  &:hover {
    color: ${colors.red};
  }
`;

const RoomCard = ({ isOwner, user, room }) => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const { id, name, isPublic, mood, moodMessage } = room;

  const handleDeleteEvent = async () => {
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
    <CardWrapper>
      <CardFill />
      <CardEntry>
        <CardEntryTitle>ROOM NAME</CardEntryTitle>
        <CardEntryValue>{name}</CardEntryValue>
      </CardEntry>
      <CardEntry>
        <CardEntryTitle>ACCESS</CardEntryTitle>
        <CardEntryValue>{isPublic ? "private" : "public"}</CardEntryValue>
      </CardEntry>
      <CardEntry>
        <CardEntryTitle>MOOD</CardEntryTitle>
        <CardEntryValue>{mood}</CardEntryValue>
      </CardEntry>
      <CardEntry>
        <CardEntryTitle>MOOD MESSAGE</CardEntryTitle>
        <CardEntryValue>{moodMessage}</CardEntryValue>
      </CardEntry>
      {isOwner && (
        <CardIcon
          className="fas fa-trash-alt"
          onClick={handleDeleteEvent}
        ></CardIcon>
      )}
    </CardWrapper>
  );
};

export default RoomCard;
