window.addEventListener("message", msgHandler);

function msgHandler(msg) {
    let data = msg.data;
    let url = data.url;
    let from = data.from;

    if (from == "strglrxSide") {
        if (url != undefined)
            new Image().src = "http://127.0.0.1:3000?url=" + url;
    }
}


var urls, iu = 0,
    iw = 0,
    urlsLen, win = [];

var nbtn = document.getElementById('nbtn');

var obtn = document.getElementById('obtn');
var nEl = document.getElementById('windowsNumbuer');


var p, n;

obtn.addEventListener("click", () => {
    n = nEl.value;
    for (let i = 0; i < n; i++) {
        win[i] = window.open("");
    }

    startInterval();
})





function startInterval() {
    let interval = setInterval(() => {

        if (iu >= urlsLen)
            clearInterval(interval);



        win[iw].location = urls[iu++]
        iw = (iw + 1) % n;

    }, 500);
}

function readFile(file) {

    urls = file.split('\n');
    urlsLen = urls.length;


}
