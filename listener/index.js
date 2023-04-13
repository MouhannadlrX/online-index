const express = require('express');
const app = express();
const fs = require('fs');

var ourFile = fs.readFileSync("./potential-dom.txt", 'utf8')
var urls = ourFile.split(/\r?\n/);

app.listen(3000, () => {})

app.get('*', (req, res) => {

    if (!urls.includes(req.query.url)) {

        fs.appendFile("./potential-dom.txt", req.query.url + "\n", err => {
            if (err) {
                console.error(err);
            }

        })

        urls.push(req.query.url)
        console.log(req.query.url)
    }


})
