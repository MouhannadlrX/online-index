    function (sinkDetails, sinks, interestingSinks) {
        if (!((sinkDetails.value.startsWith("http") && !sinkDetails.value.startsWith("http://d0mxss")) || ((sinkDetails.value.startsWith("https") && !sinkDetails.value.startsWith("https://d0mxss"))) || (sinkDetails.sink == 'jQuery') || (sinkDetails.sink == 'jQuery.init') || (sinkDetails.sink == 'element.setAttribute.href' && sinkDetails.value.startsWith("/")) || ((sinkDetails.sink == 'location.replace' || sinkDetails.sink == 'location.href' || sinkDetails.sink == 'element.setAttribute.src' || sinkDetails.sink == 'location') && !(sinkDetails.value.startsWith("https://d0mxss") || sinkDetails.value.startsWith("http://d0mxss") || sinkDetails.value.startsWith("d0mxss")))) && sinkDetails.value.includes("d0mxss\"\"")) {
            window.opener.postMessage({
                "from": "strglrxSide",
                "url": location.href
            }, "*");
            return true; //return true to log sink
        }

    }
