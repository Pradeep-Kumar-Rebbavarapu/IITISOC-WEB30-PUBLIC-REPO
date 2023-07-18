import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillFileText, AiOutlineFileText } from 'react-icons/ai';
import {MdRecordVoiceOver } from 'react-icons/md'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SendYourSpokenDataToOtherPeers } from './SpokenData';
import { setTranscript } from '../store/actions';
import { store } from '../store/store';
import parse from 'html-react-parser';
export default function SpeechToText({speechToText,setSpeechToText,resetTranscript,transcript,peers,browserSupportsSpeechRecognition,Transcript}) {
   
    
    
   

    const toggleSpeechToTextBtn = async () => {
        if (!speechToText) {
            resetTranscript()
            setSpeechToText(true);
            SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
            
        } else {
            await SendYourSpokenDataToOtherPeers(transcript,peers)
            SpeechRecognition.stopListening();
            const oldTranscript = store.getState().Transcript
            store.dispatch(setTranscript(`<div>${oldTranscript} ${transcript}</div>`))
            resetTranscript()
            setSpeechToText(false);
        }
    };

    
    
    

    
    

    return (
        <>
        <div className='h-fit w-fit hidden lg:block '>
            <div
                id="Left_Nav_SpeechToText_Btn"
                className={`focus:bg-white cursor-pointer w-fit h-fit my-5  flex items-center flex-col justify-center lg:block p-3 rounded-lg ${speechToText ? 'bg-white' : 'hover:bg-white'
                    }  transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100`}
                onClick={toggleSpeechToTextBtn}
            >
                
                <MdRecordVoiceOver className="w-7 h-7 mx-auto" />
                <div className="text-md lg:hidden transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{speechToText? "Stop Speech To Text" : "Start Speech To Text"}</div>
            </div>
            
        </div>
        <div className='h-full w-full my-auto lg:hidden'>
            <div
                id="Left_Nav_SpeechToText_Btn"
                className={`focus:bg-white cursor-pointer h-full w-full  p-3 rounded-lg hover:bg-white transition-all flex flex-col text-center  justify-center mx-auto text-orange-600 bg-opa-20 hover:bg-opacity-100 ${speechToText ? 'bg-white' : 'hover:bg-white'
                    }  transition-all text-orange-600 bg-opacity-100 hover:bg-opacity-100`}
                onClick={toggleSpeechToTextBtn}
            >
                
                <MdRecordVoiceOver className="w-7 h-7 mx-auto" />
                <div className="text-md lg:hidden transition-all fade-in-out text-gray-400 mt-2 group-hover:text-orange-500 text-center">{speechToText? "Stop Speech To Text" : "Start Speech To Text"}</div>
            </div>
            
        </div>
        </>
    );
}
