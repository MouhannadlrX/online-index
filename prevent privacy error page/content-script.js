let cnt = 0;

let interval = setInterval(() => {

    if (cnt >= 10)
        clearInterval(interval)

    let a = document.getElementById("proceed-link");
    if (a != undefined && a.className == "small-link" && a.href == "chrome-error://chromewebdata/#")
        a.click();

    cnt++;
}, 1000)