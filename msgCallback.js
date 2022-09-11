function (msg) {
    if (msg.confidence == 'Firm' || msg.confidence == 'Certain') {
        window.opener.postMessage({
            "from": "strglrxSide",
            "url": location.href
        }, "*");
        return true; //return true to log sink
    }
}