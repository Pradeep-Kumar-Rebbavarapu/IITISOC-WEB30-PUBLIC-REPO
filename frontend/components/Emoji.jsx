import React,{useState} from "react";
import EmojiPicker,{
  EmojiStyle,
  SkinTones,
  Theme,
  Emoji as NewEmoji,
  Categories,
  EmojiClickData,
  SuggestionMode,
  SkinTonePickerLocation
} from "emoji-picker-react";
import {toast} from 'react-toastify'
import EmojiToast from "./EmojiToast";
export default function Emoji({peers,props}) {
  
  
  function onClick(emojiData) {
    
    
    for(let socketId in peers.current){
      peers.current[socketId].send(JSON.stringify({
        emoji:true,
        data:emojiData.emoji,
        identity:props.identity
      }))
    }
    toast(<EmojiToast emoji={emojiData.emoji} name={props.identity} />, {
      position: "bottom-left",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      closeButton: false,
      style: {
          maxWidth: 'fit-content',
          maxHeight: 'fit-content',
          backgroundColor: 'transparent',
          left: '30%',
          bottom: '120px',
          border: 'none',
          boxShadow: 'none',
      }

  });
  }
  return (
    <div>
      
      <div id="emoji" className=" flex justify-center items-center ">
        <EmojiPicker
          onEmojiClick={onClick}
          
        autoFocusSearch={false} emojiStyle={EmojiStyle.NATIVE} theme="dark" />
      </div>
    </div>
  );
}
