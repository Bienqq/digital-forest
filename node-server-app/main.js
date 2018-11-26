const dns = require("dns");
const os = require("os");
const express = require("express")
const app = express()

const PORT = 8090

dns.lookup(os.hostname(), (error, address, fam) => {
    app.listen(PORT, () => {
        console.log("-------------------APLICATION STARTED--------------------");
        console.log("Hostname : " + os.hostname());
        console.log("IP : " + address);
        const serverAddress = `http://${address}:${PORT}`;
        console.log(`Server is listening at : ${serverAddress}`);
    })
});