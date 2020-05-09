const express = require('express')
const http = require("http");
const app = express()
const port = 3000

app.get('/TVTime/LookUp', (req, res) => {
    console.log(req.query)
    let path = '/TVTime/LookUp?key=' + req.query.key + '&pId=' + req.query.pId
    getLookUp ( path, (body) => {
        res.json(JSON.parse(body))
        res.end();
    })
})

app.get('/TVTime/TVlist', (req, res) => {
    console.log(req.query)
    let path = '/TVTime/TVlist?key=' + req.query.key + '&code=' + req.query.code
    getTVlist ( path, (body) => {
        res.json(JSON.parse(body))
        res.end();
    })
})

function getLookUp (path, callback) { // 查询频道列表
    let opt = {
        host: 'api.avatardata.cn', // 这里填主域名
        method:'POST',
        path:'https://api.avatardata.cn' + path, // 这里填完整url
        headers:{
            "Content-Type": 'application/json',
        }
    }
    let body = '';
    let req = http.request(opt, function(res) {
        console.log("response: " + res.statusCode);
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
            console.log(body)
            callback(body)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    })
    req.end();
}

function getTVlist (path, callback) { // 查询频道列表
    let opt = {
        host: 'api.avatardata.cn', // 这里填主域名
        method:'POST',
        path:'https://api.avatardata.cn' + path, // 这里填完整url
        headers:{
            "Content-Type": 'application/json',
        }
    }
    let body = '';
    let req = http.request(opt, function(res) {
        console.log("response: " + res.statusCode);
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
            console.log(body)
            callback(body)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    })
    req.end();
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))