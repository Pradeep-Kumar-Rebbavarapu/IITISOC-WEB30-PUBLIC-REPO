let array = [];

self.addEventListener("message", event => {
    
    if (event.data === "download") {
        const uint8Array = new Uint8Array(array.flat());
        const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
        self.postMessage(blob);
        array = [];
    } else {
        array.push(event.data);
        console.log(array)
    }
    
});

