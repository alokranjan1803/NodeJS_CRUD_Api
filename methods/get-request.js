module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    //console.log(baseUrl);
    let id = req.url.split("/")[3];
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    //console.log(id);
    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if(!regexV4.test(id)){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Validation Failed", message: "UUID is not valid"}));

    }
    else if(regexV4.test(id) && baseUrl === "/api/movies/"){
        
        res.setHeader("Content-Type", "application/json");
        let filterMovie = req.movies.filter((movie)=> {
            return movie.id === id;
        });
        if(filterMovie.length > 0){
            res.statusCode = 200;
            res.write(JSON.stringify(filterMovie));
            res.end();
        }
        else{
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({title: "Not Found", message: "Movie Not Found"}));  
            res.end();
        }
        
    }
    else{
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({title: "Not Found", message: "Route Not Found"}));
    }
};