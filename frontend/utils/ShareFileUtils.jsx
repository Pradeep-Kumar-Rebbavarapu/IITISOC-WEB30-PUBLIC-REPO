
import { setMessages } from '../store/actions';
import { store } from '../store/store';
import { sendDirectMessage } from './MessageUtils';
var time;
import { v4 as uuidv4 } from 'uuid';
export const download = (worker, setGotFile, fileName) => {
    worker.current.postMessage("download");

    const listener = (event) => {
        const stream = event.data
        const url = URL.createObjectURL(stream);
        const a = document.createElement('a')
        a.href = url;
        a.download = fileName;
        a.click();
        worker.current.removeEventListener("message", listener); // Remove the event listener
    };

    worker.current.addEventListener("message", listener);
};



export function handleReceiveData(worker, data) {

    if (data.done === true) {
        const FileData = {
            File: true,
            content: data.fileName,
            identity: data.identity,
            messageCreatedByMe: false
        }
        const messages = store.getState().messages
        store.dispatch(setMessages([...messages, FileData]))
    } else {
        console.time('timer started');
        worker.postMessage(data.chunk);
    }

}

export function selectFile(setFile, e) {
    setFile(e.target.files[0]);
}

export function sendFile(File, peers, identity, setProgress, socket, PrivateSharing, RecieverSocketID,setFile) {

    setProgress.current = Date.now();
    const fileName = (uuidv4().toString() + File.name).replace(/\s+/g, '');
    const FileData = {
        File: true,
        content: fileName,
        identity: identity,
        messageCreatedByMe: true,
    };
    if (PrivateSharing) {
        sendDirectMessage(fileName, socket, RecieverSocketID, identity,true);
    }
    else {
        const messages = store.getState().messages;
        store.dispatch(setMessages([...messages, FileData]));
    }

    const Chat_Area = document.getElementById('Chat_Area');
    setTimeout(() => {
        Chat_Area.scrollTop = Chat_Area.scrollHeight - Chat_Area.clientHeight;
    }, 100);
    const stream = File.stream();
    const reader = stream.getReader();
    const peerList = Object.values(peers.current);
    const fileSize = File.size;
    if (fileSize > 100 * 1024 * 1024) {
        alert('You can only share files of size below 100MB');
        return;
    }

    const optimalChunkSize = 256 * 1024;
    const totalChunks = Math.ceil(fileSize / optimalChunkSize);
    for (let socketId in peers.current) {
        sendChunks();

        async function sendChunks() {
            let chunkIndex;
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    if (PrivateSharing) {
                        if (socketId === RecieverSocketID) {
                            socket.current.send(
                                JSON.stringify({
                                    type: 'file-message',
                                    data: {
                                        done: true,
                                        fileName: fileName,
                                        identity: identity,
                                        ID: socket,
                                        Group: false
                                    },
                                })
                            );
                        }

                    }
                    else {
                        socket.current.send(
                            JSON.stringify({
                                type: 'file-message',
                                data: {
                                    done: true,
                                    fileName: fileName,
                                    identity: identity,
                                    ID: socketId,
                                    Group: true
                                },
                            })
                        );
                    }
                    break;
                }

                let offset = 0;
                while (offset < value.length) {
                    const chunk = value.slice(offset, offset + optimalChunkSize);
                    if (PrivateSharing) {
                        if (socketId === RecieverSocketID) {
                            socket.current.send(
                                JSON.stringify({
                                    type: 'file-message',
                                    data: {
                                        done: false,
                                        chunk: Array.from(new Uint8Array(chunk)),
                                        ID: socketId,
                                        Group: false
                                    },
                                })
                            );
                        }

                    }
                    else {
                        socket.current.send(
                            JSON.stringify({
                                type: 'file-message',
                                data: {
                                    done: false,
                                    chunk: Array.from(new Uint8Array(chunk)),
                                    ID: socketId,
                                    Group: true
                                },
                            })
                        );
                    }

                    offset += optimalChunkSize;
                    chunkIndex++;
                }
            }
        }
    }

    setFile(null)
    document.getElementById('DataInput').value = null;
}
