const crypto = require("crypto");
const requestBodyParser = require("../utils/body-parser");

module.exports = async (req, res) => {
    if(req.url === "/api/movies"){
        try {
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end();
        } catch (err) {
            console.log(err);
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({title: "Validation Failed", message: "Request Body is not Valid"}));  
            res.end();

        }
    }
    else{
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found"}));
    }
};