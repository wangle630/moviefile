//var mysql=require("./mysql.js");
//
//mysql.query_delete("select * from t_account where accountName = 'ww2' limit 1 ",function(err,vals,fields,callback) {
//    if (err) {
//        console.log(err);
//    }
//    console.log('------------------select--------------------');
//    console.log(vals);
//    if(vals){
//        for(var val in vals){
//            console.log(vals[val].id +'    ' +  vals[val].name);
//        }
//    }
//});
//
//mysql.query_delete("delete from t_walter where id ='1' ",function(err,vals,fields,callback) {
//    if (err) {
//        console.log('------------------delete--------------------');
//        console.log(err);
//        callback(err);
//
//        //callback(err);
//    }
//    if(vals){
//        console.log('------------------delete--------------------');
//        console.log(vals);
//    }
////});
//var date = new Date();
//
//
//var date2 = new Date().toISOString().slice(0, 19).replace('T', ' ');
//console.log(date2);
//
//
//mysql.query_delete("INSERT INTO t_walter (id,name,shijian) VALUES(212,'walter','"+date2.toString()+"'); ",function(err,vals,fields,callback) {
//    if (err) {
//        console.log(err);
//        callback(err);
//    }
//    if(vals){
//        console.log('------------------insert--------------------');
//        console.log(vals);
//    }
//});

var http = require('http');
var MSUser = require('./models/mysql_user');
var mysql = require('mysql'); //引入MySQL API

var db = mysql.createConnection({  //连接MySQL
    host:     '125.35.1.38',
    user:     'admin',
    password: 'admin123',
    database: 'remote_guide',
    port: 5576
});

var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST':  //HTTP POST请求路由
            switch(req.url) {
                case '/':
                    MSUser.add(db, req, res);
                    break;
                case '/archive':
                    MSUser.archive(db, req, res);
                    break;
                case '/delete':
                    MSUser.delete(db, req, res);
                    break;
            }
            break;
        case 'GET':  //HTTP GET请求路由
            switch(req.url) {
                case '/':
                    MSUser.getAll(db, function(err , rows){
                        console.log(rows);
                    });

                    break;
                case '/archived':
                    MSUser.showArchived(db, res);
                    break;
            }
            break;
    }
});
console.log('Server started...');
server.listen(3000, '127.0.0.1');