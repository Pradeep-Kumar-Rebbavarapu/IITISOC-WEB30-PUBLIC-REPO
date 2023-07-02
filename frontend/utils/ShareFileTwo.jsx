import { setMessages } from "../store/actions";
import { store } from "../store/store";
import { appendNewMessage, sendMessage } from "./MessageUtils";
import {v4 as uuidv4} from 'uuid'
var chunkLength = 1000 * 6000, file_size, file_name;

export const sendFile = (File, peers, setFile, identity, setUploadingText) => {
    let id = uuidv4()
    file_name = File.name;
    file_size = File.size;
    let localMessageData = {
        id:id,
        File: true,
        content: file_name,
        identity: identity,
        messageCreatedByMe: true
    }
    appendNewMessage(localMessageData)
    sliceandsend(File, peers, setFile, setUploadingText,id);
    
}

function sliceandsend(file, peers, setFile, setUploadingText,id) {
    
    var fileSize = file.size;
    var name = file.name;
    var mime = file.type;
    var chunkSize = 64 * 1024; // bytes
    var offset = 0;

    for (let socketId in peers.current) {
       
        let peer = peers.current[socketId];

        function readChunk(first) {
            var blob = file.slice(offset, offset + chunkSize);
            var reader = new FileReader();

            reader.onload = function (evt) {
                if (!evt.target.error) {
                    offset += chunkSize;
                    
                    document.getElementById(id).innerHTML = `${(offset / fileSize) * 100}%`
                    if (offset >= fileSize) {
                        var lastBlob = new Blob([evt.target.result], { type: mime });
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            var data = {
                                File: true,
                                file_name: name,
                                first: first,
                                id:id,
                                file_size: fileSize,
                                message: Array.from(new Uint8Array(evt.target.result)),
                                last: true,
                                mime: mime
                            };

                            
                            peer.write(JSON.stringify(data));
                           
                            document.getElementById(id).innerHTML = name + "/" + mime
                            document.getElementById(id).disabled = false
                        };
                        reader.readAsArrayBuffer(lastBlob);
                        return;
                    } else {
                        var chunkBlob = new Blob([evt.target.result], { type: mime });
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            var data = {
                                File: true,
                                first: first,
                                file_name: name,
                                id:id,
                                file_size: fileSize,
                                message: Array.from(new Uint8Array(evt.target.result)),
                                last: false,
                                mime: mime
                            };

                            
                            peer.write(JSON.stringify(data));
                        };
                        reader.readAsArrayBuffer(chunkBlob);
                    }
                } else {
                    console.log("Read error: " + evt.target.error);
                    return;
                }

                readChunk(false);
            };

            reader.readAsArrayBuffer(blob);
        }

        readChunk(true);
    }

    setFile(null);
}



var receivedSize = 0; var recProgress = 0;
var arrayToStoreChunks = [];
var counterBytes = 0;

export const handleData = (data) => {
    
    const arrayBuffer = new Uint8Array(data.message).buffer;

    receivedSize += arrayBuffer.byteLength;
    counterBytes = counterBytes + receivedSize;

    recProgress = (receivedSize / data.file_size) * 100;
    recProgress = parseFloat(recProgress + "").toFixed(2)

    arrayToStoreChunks.push(arrayBuffer); // pushing chunks in array

    if (recProgress > 0) {
        var speed = formatBytes(counterBytes / 1000, 2) + "/s";
        var sdata = {};
        sdata.type = "progress_info";
        sdata.msg = recProgress;
        sdata.speed = speed;
        document.getElementById(data.id).innerHTML = `${recProgress}% - ${speed}`
    }
    if (data.last) {
        setTimeout(function () {
            var speed = 0
            var sdata = {};
            sdata.type = "progress_info";
            sdata.msg = 100;
            sdata.speed = 0;
            document.getElementById(data.id).innerHTML = `${data.file_name}/${data.mime}`
            document.getElementById(data.id).disabled = false
            
        }, 500)

        const received = new Blob(arrayToStoreChunks);
       
        // saveToDisk(arrayToStoreChunks.join(''), data.file_name,data.file_size,data.mime);
        downloadBuffer(URL.createObjectURL(received),data.file_name,data.id);
        arrayToStoreChunks = []; // resetting array
        recProgress = 0;
        receivedSize = 0;

    }


};


function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function downloadBuffer(fileUrl, fileName,id) {
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = fileName
    a.id = `download_${id}`
    a.style.display = "none"
    document.body.append(a)
}

export const download = (id) =>{
    const downloadBtn = document.getElementById(`download_${id}`)
    downloadBtn.click()
}