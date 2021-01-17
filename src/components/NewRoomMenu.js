import React, { useState } from "react";
import styled from "styled-components";
import { colors, fonts } from "../defaultStyles";
import { useFirebase } from "../contexts/FirebaseContext";

const MenuWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 15px 35px;
  align-items: center;
  justify-content: center;
`;

const TitleLabel = styled.span`
  font-family: ${fonts.primaryFont};
  color: ${colors.lightBlue};
  text-transform: uppercase;
  font-size: 2.5rem;
  line-height: 1em;
  margin-bottom: 1.5rem;
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

const DropDownMenu = styled.select`
  border-radius: 5px;
  border: none;
  background-color: ${colors.backgroundBlue};
  padding: 15px;
  outline: none;
  font-family: ${fonts.secondaryFont};
  color: ${colors.textPrimary};
  font-size: 1rem;
  text-transform: capitalize;

  &:focus {
    outline: none;
  }
`;

const DropDownMenuItemWrapper = styled.option`
  text-transform: capitalize;
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

const DropDownMenuItem = ({ selected, disabled, hidden, value }) => {
  return (
    <DropDownMenuItemWrapper
      selected={selected}
      disabled={disabled}
      hidden={hidden}
      value={value}
    >
      {value}
    </DropDownMenuItemWrapper>
  );
};

const moodOptions = ["chilling", "grinding", "lasered"];

const NewRoomMenu = ({ user, onSubmit }) => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  //room name will start as UserName's Room
  const [roomName, setRoomName] = useState(
    `${user.firstName} ${user.lastName}'s Study Room`
  );
  const [mood, setMood] = useState("chilling");
  const [isPublic, setIsPublic] = useState(false);
  const [roomPassword, setRoomPassword] = useState("");
  const [moodMessage, setMoodMessage] = useState("");

  const createRoom = async (e) => {
    e.preventDefault();
    const today = new Date();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: {
          date: `${today.getUTCFullYear()}-${
            `${today.getUTCMonth() + 1}`.length < 2
              ? `0${today.getUTCMonth() + 1}`
              : today.getUTCMonth() + 1
          }-${
            `${today.getUTCDate()}`.length < 2
              ? `0${today.getUTCDate()}`
              : today.getUTCDate()
          }`,
        },
        end: {
          date: `${today.getUTCFullYear()}-${
            `${today.getUTCMonth() + 1}`.length < 2
              ? `0${today.getUTCMonth() + 1}`
              : today.getUTCMonth() + 1
          }-${
            `${today.getUTCDate() + 1}`.length < 2
              ? `0${today.getUTCDate() + 1}`
              : today.getUTCDate() + 1
          }`,
        },
        conferenceData: {
          createRequest: {
            requestId: user.email,
          },
        },
      }),
    };
    const createEventResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${user.email}/events?conferenceDataVersion=1`,
      requestOptions
    ).then((response) => response.json());
    console.log(createEventResponse);
    await db
      .collection("rooms")
      .doc(createEventResponse.id)
      .set({
        id: createEventResponse.id,
        host: user.email,
        hangoutLink: createEventResponse.hangoutLink,
        linkClicks: 0,
        name: roomName,
        isPublic: isPublic,
        password: roomPassword,
        mood: mood,
        moodMessage: moodMessage,
        createdTime: firebase.firestore.Timestamp.fromDate(
          new Date(createEventResponse.created)
        ),
      })
      .catch((error) => {
        alert(
          `Error: Failed to create study room in the database.\n\nError: ${error}`
        );
      });

    onSubmit();
  };

  return (
    <form
      onSubmit={createRoom}
      style={{ display: "flex", flexFlow: "column nowrap", width: "100%" }}
    >
      <TitleLabel>Create a New Study Room</TitleLabel>
      <MenuWrapper>
        <InputLabel htmlFor={"new-room-name"} type="text">
          Room Name
        </InputLabel>
        <TextInput
          id={"new-room-name"}
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <InputLabel htmlFor={"new-room-public"}>Public</InputLabel>
        <DropDownMenu
          name={"new-room-public"}
          id={"new-room-public"}
          onChange={(e) =>
            setIsPublic(e.target.value === "true" ? true : false)
          }
          defaultValue={"false"}
        >
          <DropDownMenuItem value={"true"} />
          <DropDownMenuItem value={"false"} />
        </DropDownMenu>

        {!isPublic && (
          <>
            <InputLabel htmlFor={"new-room-password"}>Password</InputLabel>
            <TextInput
              id={"new-room-password"}
              type="text"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
            />
          </>
        )}
        <InputLabel htmlFor={"new-room-mood"}>Mood</InputLabel>
        <DropDownMenu
          name={"new-room-moods"}
          id={"new-room-moods"}
          onChange={(e) => setMood(e.target.value)}
          defaultValue={"chilling"}
        >
          {moodOptions.map((option, index) => (
            <DropDownMenuItem key={`mood-${index}`} value={option} />
          ))}
        </DropDownMenu>
        <InputLabel htmlFor={"new-room-mood-message"}>Mood Message</InputLabel>
        <TextInput
          id={"new-room-mood-message"}
          placeholder={"Optional"}
          type="text"
          value={moodMessage}
          onChange={(e) => setMoodMessage(e.target.value)}
        />
      </MenuWrapper>
      <SubmitButton>Create Room</SubmitButton>
    </form>
  );
};

export default NewRoomMenu;
