const express = require('express');
const http = require('http');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const router = express.Router();
const apikey = '04586d229307477aa96526f6e53cd1bb';
const today = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(); // 当前日期

let setRedis = function (key, data) { // 添加redis
    return new Promise ((resolve, reject) => {
        client.set(key, data, function (err, result) {
            resolve(result)
        })
    })
}

let getRedis = function (key) { // redis查询
    return new Promise ((resolve, reject) => {
        client.get(key, function (err, data) {
            if (data) {
                resolve(data)
            } else {
                reject()
            }
        })
    })
}

router.get('/TVTime/LookUp', (req, res) => { // 频道列表接口
    let redisKey = req.query.pId + today
    getRedis(redisKey).then(result => {
        res.json({
            result: JSON.parse(result),
            error_code: 0,
            reason: "Succes"
        })
        res.end();
    }).catch(err => {
        let path = '/TVTime/LookUp?key=' + apikey + '&pId=' + req.query.pId
        getLookUp ( path, (body) => {
            let data = JSON.stringify(JSON.parse(body).result)
            setRedis(redisKey, data).then(result => {
                res.json(JSON.parse(body))
                res.end();
            })
        })
    })
})

router.get('/TVTime/TVlist', (req, res) => {  // 节目列表接口
    let redisKey = req.query.code + today
    getRedis(redisKey).then(result => {
        res.json({
            result: JSON.parse(result),
            error_code: 0,
            reason: "Succes"
        })
        res.end();
    }).catch(err => {
        let path = '/TVTime/TVlist?key=' + apikey + '&code=' + req.query.code
        getTVlist ( path, (body) => {
            let data = JSON.stringify(JSON.parse(body).result)
            setRedis(redisKey, data).then(result => {
                res.json(JSON.parse(body))
                res.end();
            })
        })
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
    let req = http.request(opt, function(res) {
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
