var http = require("http");

// var data = {username:"hello",password:"123456"};
// data = JSON.stringify(data);
//data = require('querystring').stringify(data);
function getData () {
    var opt = {
        host: 'api.avatardata.cn', // 这里填主域名
        method:'POST',
        path:'https://api.avatardata.cn/TVTime/LookUp?key=04586d229307477aa96526f6e53cd1bb&pId=1', // 这里填完整url
        headers:{
            "Content-Type": 'application/json',
        }
    }

    var body = '';
    var req = http.request(opt, function(res) {
        console.log("response: " + res.statusCode);
        res.on('data',function(data){
            body += data;
        }).on('end', function(){
            console.log(body)
        });
    }).on('error', function(e) {
        console.log("error: " + e.message);
    })

    // req.write(data);

    req.end();
    console.log('123')
}

getData()
