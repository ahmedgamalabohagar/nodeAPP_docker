const express = require('express');
const mongoos=require('mongoose');
// const { Client } = require('pg');
const redis=require('redis');

//init app
const PORT = process.env.PORT || 4000;
const app = express();

// //connect DB
const DB_USER='root';
const DB_PASSWORD='example';
const DB_port=27017;
const DB_HOST='mongo';
const URI=`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_port}`;



mongoos
.connect(URI)
.then(()=>console.log('connected to db ... '))
.catch((err)=>console.log("failed to connect to db :",err));


//connect postgressql DB
// const DB_USER='root';
// const DB_PASSWORD='example';
// const DB_port=5432;
// const DB_HOST='postgres';
// const URI=`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_port}`;

// const client = new Client({
//   connectionString: URI,
// });



// client
// .connect()
// .then(()=>console.log('connected to db ... '))
// .catch((err)=>console.log("failed to connect to db :",err));



//connect redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = redis.createClient(
    {  url: `redis://${REDIS_HOST}:${REDIS_PORT}`}
);
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect' , ()=> console.log('Redis Client Connected ...'));
redisClient.connect();


app.get('/' , (req,res)=>{
        redisClient.set('products','products ...')
        res.send('<h1>hello gemy, from Docker hub</h1>')
    });


app.get('/data' , async (req,res)=>{
    const products= await redisClient.get('products');
    res.send(`<h1>hello , a gemy</h1> <h2>${products}</h2>`);
});

app.listen(PORT , () => console.log('app is up and running on port: ',PORT));