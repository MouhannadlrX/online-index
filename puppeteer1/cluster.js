const fs = require("fs");

const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    monitor: true,
puppeteerOptions: {
      headless: "new",
      // headless:false,
      dumpio: true,
}
});

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    // Store screenshot, do something else
  });

  (async () => {
    var file = await fs.readFileSync("./test/urls.txt", "utf8");
    var urls = await file.split(/\r?\n/);
    for (const url of urls) {
      cluster.queue(url);
    }
  })();
  // many more pages

  await cluster.idle();
  await cluster.close();
})();
