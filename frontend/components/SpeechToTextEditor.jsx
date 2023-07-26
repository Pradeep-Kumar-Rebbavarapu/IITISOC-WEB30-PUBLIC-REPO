import axios from "axios";
import React, { useContext, useState } from "react";
import parse from "html-react-parser";
import Context from "../context/Context";
export default function SpeechToTextEditor({
  speechToText,
  props,
  transcript,
  OpenTextEditor,
  listening
}) {
  const {auth} = useContext(Context)
  const [loading,setloading] = useState(false)
  console.log(auth)
  const handleSummarizeAndDownload = () => {
    setloading(true)
    const prompt = `
    Can u Summarize My Below Paragraph No Matter What Ever It Is,Make the Content of the Paragraph More Professional,More Understandable to Layman People,Check Any Gramatical Mistakes and Also Correct Words Which Are Of No Meaning And Return In HTML Format No Matter What Ever the Paragraph Is , The Final Single Output With No Errors.
    paragraph = ${props.Transcript}
    `;
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization:
              "Bearer " + "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",
          },
        }
      )
      .then(async (response) => {
        console.log(response.data.choices[0].message.content);
        const htmlString = response.data.choices[0].message.content;
        await axios.post('https://www.pradeeps-video-conferencing.store/api/v1/ConvertHtmlToDocx/',{data:response.data.choices[0].message.content},{
          headers:{
            Authorization:'Bearer '+auth.access,
          }
        }).then((response)=>{
          console.log(response.data)
          const url = response.data.download_url
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file.docx'); //or any other extension
          document.body.appendChild(link);
          link.click();
          setloading(false)
        })
      });
  };
  return (
    <div className="flex flex-col w-full h-full px-10">
      <div className="md:grid md:grid-cols-[100px_auto] h-fit md:py-4   px-">
        <div className="w-full h-full md:flex hidden justify-center items-center ">
          <button
            className="bg-black p-2 rounded-md mx-auto my-auto text-white uppercase hover:ring-4 hover:ring-opacity-50 hover:ring-black transition-all fade-in-out"
            onClick={() => {
              OpenTextEditor();
            }}
          >
            Close
          </button>
        </div>
        <div>
					<div className="w-full h-full md:flex justify-center items-center  text-black text-center font-bold text-xl hidden my-2">
						AI SPEECH TO TEXT
					</div>
				</div>
      </div>
      <div className=" h-full md:my-10 my-5 border-b-2 md:border-b-0  overflow-y-scroll p-3 text-xl font-medium bg-gray-100 rounded-md ring-8 ring-opacity-50 ring-gray-500">
        {speechToText
          ? parse(`<div>${props.Transcript}</div> <div>${transcript}</div>`)
          : parse(props.Transcript)}
      </div>
      <div className="w-full h-fit flex justify-center items-center border-t-2 py-4">
        <button
          disabled={listening || loading}
          onClick={handleSummarizeAndDownload}
          className="bg-black font-bold text-white p-2 rounded-md hover:ring-4 hover:ring-opacity-50 hover:ring-black transition-all fade-in-out text-xl"
        >
          {listening?"Turn Of Ai Speech To Text To Summarize":loading?"Summarizing...":"Summarize & Download"}
          
        </button>
      </div>
    </div>
  );
}
