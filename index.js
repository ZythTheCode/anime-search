import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4";

app.use(bodyParser.urlencoded({ extended : true}));

app.get("/", async(req,res) => {
    res.render("index.ejs")
})


app.post("/random", async(req,res) => {
    try {
        const response = await axios.get(API_URL + "/random/anime");
        const randData = response.data.data;
        console.log(randData)
        res.render("index.ejs", {
        randData: randData,
        title : randData.title,
        image : randData.images.jpg.large_image_url,
        type : randData.type,
        num_ep : randData.episodes,
        duration : randData.duration,
        aired : randData.aired.string,
        status : randData.status,
        ratings : randData.rating,
        genre : randData.genres,
        desc : randData.synopsis,
    })
    } catch (error) {
        console.log(error.message)
    }
    
})

app.post("/search", async(req,res) => {
    const queryAnime = req.body.search;
    const page = req.body.page;
    try {
        const searchData = await axios.get(API_URL + "/anime" + `?q=${queryAnime}&page=${page}`);
        console.log(searchData.data.data);
        res.render("index.ejs", {
            searchData : searchData.data.data
    })
    } catch (error) {
        console.log(error.message)
    }
    
})
app.post("/search", async(req,res) => {
    const queryAnime = req.body.search;
    const page = req.body.page;
    try {
        const searchData = await axios.get(API_URL + "/anime" + `?q=${queryAnime}&page=${page}`);
        console.log(searchData.data.data);
        res.render("index.ejs", {
            searchData : searchData.data.data
    })
    } catch (error) {
        console.log(error.message)
    }
    
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.use(express.static("public"));