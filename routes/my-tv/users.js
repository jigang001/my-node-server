const express = require('express');
const https = require('https');
const mysql  = require('mysql');
const querySql = require("../../util/db");
const router = express.Router();

const pool = mysql.createPool({
    host: '118.25.47.118',
    user: 'root',
    password: 'jigang=19900317',
    port: '3306',
    database: 'my-tv'
})

/* GET users listing. */
 router.get('/', function(req, res, next) {
    getOpenId ( req.query.code, (body) => {
        res.json(JSON.parse(body))
        res.end();
    })
});

function getOpenId (code, callback) { // 查询openId
    let opt = {
        host: 'api.weixin.qq.com', // 这里填主域名
        method:'GET',
        path:'https://api.weixin.qq.com/sns/jscode2session?appid=wx37eee90e5a5337a7&secret=c3309a76436e330857308e208f169b05&js_code=' + code + '&grant_type=authorization_code', // 这里填完整url
        headers:{
            "Content-Type": 'application/json',
        }
    }
    let body = '';
    let req = https.request(opt, function(res) {
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
            console.log(JSON.parse(body).openid)
            getUserByOpenid (JSON.parse(body).openid).then( result => { // 查
                if (result.length === 0) { // 如果数据库没有这条openid
                    insertUserByOpenid (JSON.parse(body).openid).then( result => { // 插入数据
                        console.log(result)
                    }).catch( err => {
                        console.log(err)
                    })
                }
            }).catch( err => {
                console.log(err)
            })
            callback(body)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    })
    req.end();
}

let getUserByOpenid = function (openid) { // 查openid
    return new Promise ((resolve, reject) => {
        querySql(pool, 'SELECT * FROM user WHERE user.openid="' + openid + '"', function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            resolve(result)
        });
    })
}

let insertUserByOpenid = function (openid) { // 查openid
    return new Promise ((resolve, reject) => {
        querySql(pool, 'INSERT INTO user (openid) VALUES ("' + openid + '")', function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            resolve(result);
        });
    })
}

module.exports = router;
