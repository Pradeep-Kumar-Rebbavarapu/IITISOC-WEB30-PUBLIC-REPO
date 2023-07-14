import React from "react";

export default function EmojiToast({emoji,name}) {
  return (
    <div className="w-fit h-fit text-center">
        <div id="emoji" className="text-[30px]">{emoji}</div>
        <div className="text-white font-bold">{name}</div>
    </div>
  );
}
