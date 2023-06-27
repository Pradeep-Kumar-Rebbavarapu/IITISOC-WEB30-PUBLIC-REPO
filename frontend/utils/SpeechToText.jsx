import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillFileText, AiOutlineFileText } from 'react-icons/ai';
import {MdRecordVoiceOver } from 'react-icons/md'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SendYourSpokenDataToOtherPeers } from './SpokenData';
export default function SpeechToText(transcript,peers,browserSupportsSpeechRecognition) {
    const [speechToText, setSpeechToText] = useState(false);
    
    
   

    const toggleSpeechToTextBtn = () => {
        if (!speechToText) {
            setSpeechToText(true);
            SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
            
        } else {
            setSpeechToText(false);
            SpeechRecognition.stopListening();
            SendYourSpokenDataToOtherPeers(transcript,peers)
        }
    };

    // Add event listener to continue listening when speech resumes
    SpeechRecognition.onEnd = () => {
        if (speechToText) {
            SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        }
    };
    
    

    
    

    return (
        <>
        <div className='h-fit w-fit hidden lg:block'>
            <div
                id="Left_Nav_SpeechToText_Btn"
                className={`focus:bg-orange-500 cursor-pointer w-fit h-fit my-5 flex items-center flex-col justify-center lg:block p-3 rounded-lg ${speechToText ? 'bg-orange-500' : 'hover:bg-orange-500'
                    }  transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20`}
                onClick={toggleSpeechToTextBtn}
            >
                
                <MdRecordVoiceOver className="w-7 h-7 mx-auto" />
                <div className="text-md lg:hidden transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{speechToText? "Stop Speech To Text" : "Start Speech To Text"}</div>
            </div>
            
        </div>
        <div className='h-full w-full block lg:hidden'>
            <div
                id="Left_Nav_SpeechToText_Btn"
                className={`focus:bg-orange-500 cursor-pointer !h-full w-full lg:w-fit lg:h-fit my-0  flex items-center flex-col justify-center lg:block p-3 rounded-lg ${speechToText ? 'bg-orange-500' : 'hover:bg-orange-500'
                    }  transition-all text-orange-600 bg-opacity-20 hover:bg-opacity-20`}
                onClick={toggleSpeechToTextBtn}
            >
                
                <MdRecordVoiceOver className="w-7 h-7 mx-auto" />
                <div className="text-md lg:hidden transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{speechToText? "Stop Speech To Text" : "Start Speech To Text"}</div>
            </div>
            
        </div>
        </>
    );
}
