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
        console.log(searchData.data.pagination);
        res.render("index.ejs", {
            searchData : searchData.data.data,
            query : queryAnime,
            pagination : searchData.data.pagination
    })
    } catch (error) {
        console.log(error.message)
    }
    
})

app.post("/anime", async(req,res) => {
    const animeId = req.body.animeId;
    console.log(animeId);
    try {
        const response = await axios.get(`${API_URL}/anime/${animeId}`);
        const searchData = response.data;
        console.log(searchData);
        res.render("index.ejs", {
            randData : searchData,
            title : searchData.data.title,
            image : searchData.data.images.jpg.image_url,
            type : searchData.data.type,
            num_ep : searchData.data.episodes,
            duration : searchData.data.duration,
            aired : searchData.data.aired.string,
            status : searchData.data.status,
            ratings : searchData.data.rating,
            genre : searchData.data.genres,
            desc : searchData.data.synopsis,
    })
    } catch (error) {
        console.log(error.message)
    }
    
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.use(express.static("public"));