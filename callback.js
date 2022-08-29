function(sinkDetails, sinks, interestingSinks) {
   
        window.listenerAdd = 1;
        window.onload = () => {

            setTimeout(() => {
                window.opener.postMessage({"from":"strglrxSide"} ,"*");

            }, 2000)
        }
  

    if ((!sinkDetails.value.startsWith("http") || sinkDetails.value.startsWith("http://d0mxss") || sinkDetails.value.startsWith("https://d0mxss")) && sinkDetails.value.includes(sinkDetails.canary) && (sinkDetails.sink != 'jQuery' && sinkDetails.sink != 'jQuery.init') && !(sinkDetails.sink == 'element.setAttribute.href' && (!sinkDetails.value.startsWith("/d0mxss") && !sinkDetails.value.startsWith("d0mxss")))) {
        window.listenerAdd = 1;
        window.opener.postMessage({"from":"strglrxSide","url":location.href}, "*");

    }
    return true; //return true to log sink
}