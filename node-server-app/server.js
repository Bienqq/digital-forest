const http = require("http")
const dns = require("dns");
const os = require("os");
const app = require("./app")

const server = http.createServer(app)

dns.lookup(os.hostname(), (error, address, fam) => {
    server.listen(process.env.PORT, () => {
        console.log("-------------------APLICATION STARTED--------------------");
        console.log("Hostname : " + os.hostname());
        console.log("IP : " + address);
        const serverAddress = `http://${address}:${process.env.PORT}`;
        console.log(`Server is listening at : ${serverAddress}`);
    })
});