const http = require("http")
const dns = require("dns");
const os = require("os");
const app = require("./app")

const server = http.createServer(app)

const port = process.env.SERVER_PORT 

dns.lookup(os.hostname(), (error, address, fam) => {
    server.listen(port, () => {
        console.log("-------------------APLICATION STARTED-------------------");
        console.log("Hostname : " + os.hostname());
        console.log("IP : " + address);
        const serverAddress = `http://${address}:${port}`;
        console.log(`Server is listening at : ${serverAddress}`);
        console.log(`Swagger docs on ${serverAddress}/api-docs`)
    })
});