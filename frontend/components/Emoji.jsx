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
export default function Emoji({peers,props}) {
  
  console.log()
  function onClick(emojiData) {
    console.log(emojiData)
    for(let socketId in peers.current){
      peers.current[socketId].send(JSON.stringify({
        emoji:true,
        data:emojiData.emoji,
        identity:props.identity
      }))
    }
  }
  return (
    <div>
      
      <div className="dark:invert f;ex justify-center items-center ">
        <EmojiPicker
          onEmojiClick={onClick}
          
        autoFocusSearch={false} emojiStyle={EmojiStyle.NATIVE} theme="dark" />
      </div>
    </div>
  );
}
