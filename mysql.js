var mysql=require("mysql");
var config=require("./config.js");
//var pool = mysql.createPool({
//    host: config.test_db_ip,
//    user: config.test_db_user,
//    password: config.test_db_password,
//    database: config.test_db_database,
//    port:config.test_db_port
//});
 var pool = mysql.createPool({
     host: config.dev_db_ip,
     user: config.dev_db_user,
     password: config.dev_db_password,
     database: config.dev_db_database,
     port:config.dev_db_port
 });


exports.query_delete=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

exports.insert_update=function(sql,param,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,param,vals,fields){
                console.log(sql);
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};