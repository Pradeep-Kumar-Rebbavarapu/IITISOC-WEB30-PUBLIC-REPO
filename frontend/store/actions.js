const Actions = {
    SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
    SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
    SET_IDENTITY: "SET_IDENTITY",
    SET_ROOM_ID: "SET_ROOM_ID",
    SET_PARTICIPANTS:'SET_PARTICIPANTS',
    SET_SOCKETID:'SET_SOCKETID',
    SET_MESSAGES:'SET_MESSAGES',
    SET_ACTIVE_CONVERSATION:'SET_ACTIVE_CONVERSATION',
    SET_DIRECT_CHAT_HISTORY:'SET_DIRECT_CHAT_HISTORY',
    SET_TRANSCRIPT:'SET_TRANSCRIPT',
    SET_EMOJI:'SET_EMOJI',
    SET_TITLE:'SET_TITLE',
    SET_ROOM_CAPACITY:'SET_ROOM_CAPACITY'
  };
  
  export const setIsRoomHost = (isRoomHost) => {
    return {
      type: Actions.SET_IS_ROOM_HOST,
      isRoomHost,
    };
  };
  
  export const setConnectOnlyWithAudio = (onlyWithAudio) => {
    return {
      type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
      onlyWithAudio,
    };
  };
  
  export const setIdentity = (identity) => {
    return {
      type: Actions.SET_IDENTITY,
      identity,
    };
  };
  
  export const setRoomId = (roomId) => {
    return {
      type: Actions.SET_ROOM_ID,
      roomId,
    };
  };
  
  export const setParticipants = (participants) =>{
    return {
      type:Actions.SET_PARTICIPANTS,
      participants
    }
  }
  export const setSocketId = (socketId) =>{
    return {
      type:Actions.SET_SOCKETID,
      socketId
    }
  }
  export const setMessages = (messages) =>{
    return {
      type:Actions.SET_MESSAGES,
      messages
    }
  }
  export const setActiveConversation = (activeConversation) =>{
    return {
      type:Actions.SET_ACTIVE_CONVERSATION,
      activeConversation
    }
  }
  export const setDirectChatHistotry = (directChatHistory) =>{
    return {
      type:Actions.SET_DIRECT_CHAT_HISTORY,
      directChatHistory
    }
  }
  export const setTranscript = (Transcript) =>{
    return {
      type:Actions.SET_TRANSCRIPT,
      Transcript
    }
  }
  export const setEmoji = (Emoji) =>{
    return {
      type:Actions.Emoji,
      Emoji
    }
  }
  export const setTitle = (title) =>{
    return {
      type:Actions.SET_TITLE,
      title
    }
  }
  export const setRoomCapacity = (RoomCapacity) =>{
    return {
      type:Actions.SET_ROOM_CAPACITY,
      RoomCapacity
    }
  }
  export default Actions;
  