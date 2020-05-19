const express = require('express');
const https = require('https');
const router = express.Router();
const apikey = '04586d229307477aa96526f6e53cd1bb'

router.get('/TVTime/LookUp', (req, res) => {
    let path = '/TVTime/LookUp?key=' + apikey + '&pId=' + req.query.pId
    getLookUp ( path, (body) => {
        res.json(JSON.parse(body))
        res.end();
    })
})

router.get('/TVTime/TVlist', (req, res) => {
    let path = '/TVTime/TVlist?key=' + apikey + '&code=' + req.query.code
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
    let req = https.request(opt, function(res) {
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
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
    let req = https.request(opt, function(res) {
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
            callback(body)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    })
    req.end();
}

module.exports = router;
