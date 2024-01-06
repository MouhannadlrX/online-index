const { Cluster } = require("puppeteer-cluster");
const fs = require("fs");

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2866.71 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux i686 on x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2820.59 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2762.73 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2656.18 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/44.0.2403.155 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
  "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.3319.102 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2117.157 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1866.237 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/4E423F",
];

const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 2;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();

    let currentHTMLSize = html.length;

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {

      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};

async function run() {
  const cluster = await Cluster.launch({
    // ignoreDefaultArgs: ['--enable-automation'],
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 10, // Adjust the number of concurrent pages as needed
    //retryLimit : 2,
    monitor: true,
    puppeteerOptions: {
      headless: "new",
      // headless:false,
      dumpio: true,
       
      executablePath:
        "/home/mouhannadlrx/BurpSuiteCommunity/burpbrowser/120.0.6099.71/chrome",   
      args: [
        // `--disable-extensions-except=/home/mouhannadlrx/.BurpSuite/burp-chromium-extension/dom-invader-extension`,
        // `--load-extension=/home/mouhannadlrx/.BurpSuite/burp-chromium-extension/dom-invader-extension`,
        // "--no-sandbox",

        // "--incognito",
        // `--enable-chrome-browser-cloud-management`,
        // "--disable-gpu",
        // "--hide-scrollbars",
        // "--mute-audio",
        // "--disable-notifications",
        // "--no-first-run",
        // "--disable-crash-reporter",
        // "--ignore-certificate-errors",
        // "--disable-infobars",
        // "--disable-sync",
        // "--no-default-browser-check",
        // "--user-agent=" +
          // userAgents[Math.floor(Math.random() * userAgents.length)],
        // `--window-size=1920,1080`,
        // `--data-user-data=~/chromeDir1`,

        // "--disable-site-isolation-for-policy",
        // "--allow-running-insecure-content",
        // "--disable-web-security",

        // "-disable-client-side-phishing-detection",

      ],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));


  await cluster.task(async ({ page, data: url }) => {

    let statusCode = await page.goto(url, {
      timeout: 30000,
      waitUntil: ["load"],
      

    });

    // await page.waitForNavigation(); 
    // statusCode = statusCode.status();
    // if (statusCode == "200") await waitTillHTMLRendered(page);

  });

  cluster.on("taskerror", (err, data, willRetry) => {
    //Todo : retry only for specific error message not always!
    if (willRetry) {
      console.warn(
        `{{WARN!}} Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`
      );
    } else {
      console.log(`[[ERROR!]] Failed to crawl ${data}: ${err.message}`);
    }

    fs.appendFile("file.log", data + "  " + err.message, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });

  (async () => {
    var file = await fs.readFileSync("./test/urls.txt", "utf8");
    var urls = await file.split(/\r?\n/);
    for (const url of urls) {
      cluster.queue(url);
    }
  })();

  // Wait for all tasks to complete
  await cluster.idle();
  await cluster.close();
}

run();
