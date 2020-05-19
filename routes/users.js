const express = require('express');
const https = require('https');
const mysql  = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
    host     : '118.25.47.118',
    user     : 'root',
    password : 'jigang=19900317',
    port: '3306',
    database: 'my-occ'
});

connection.connect();

// connection.end();

/* GET users listing. */
/* router.get('/', function(req, res, next) {
    getOpenId ( req.query.code, (body) => {
        res.json(JSON.parse(body))
        res.end();
    })
});

function getOpenId (code, callback) { // 查询openId
    let opt = {
        host: 'api.weixin.qq.com', // 这里填主域名
        method:'GET',
        path:'https://api.weixin.qq.com/sns/jscode2session?appid=wx4b739ff21bfcc47f&secret=8af4746292b3b1820ba64845354247d1&js_code=' + code + '&grant_type=authorization_code', // 这里填完整url
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
            //查
            connection.query('INSERT INTO user (openid) VALUES ("' + JSON.parse(body).openid + '")', function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }

                console.log('--------------------------SELECT----------------------------');
                console.log(result);
                console.log('------------------------------------------------------------\n\n');
            });
            callback(body)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    })
    req.end();
} */

module.exports = router;
