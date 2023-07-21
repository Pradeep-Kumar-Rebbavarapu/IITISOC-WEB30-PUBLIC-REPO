import React from "react";

export default function EmojiToast({emoji,name}) {
  return (
    <div className="w-fit h-fit text-center">
        <div id="emoji" className="text-[50px]">{emoji}</div>
        <div className="text-black font-bold">{name}</div>
    </div>
  );
}
