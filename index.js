window.addEventListener("message", msgHandler);

function msgHandler(msg) {
    let data = msg.data;
    let url = data.url;
    let from = data.from;

    if (from == "strglrxSide") {
        if (url != undefined)
            new Image().src = "http://127.0.0.1:3000?url=" + url;

        msg.source.close();
        if (idx < urlsLen)
            openUrl();
    }
}


let urls;
let idx = 0;
let urlsLen;

function readFile(file) {

    urls = file.split('\n');
    urlsLen = urls.length;

    for (let i = 0; i < 10; i++) {
        window.open(urls[idx++]);
    }
}

function openUrl() {
    window.open(urls[idx++]);
}