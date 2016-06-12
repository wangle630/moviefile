var http = require('http');
var work = require('./timetrack');
var mysql = require('mysql'); //引入MySQL API

var db = mysql.createConnection({  //连接MySQL
    host:     '125.35.1.38',
    user:     'admin',
    password: 'admin123',
    database: 'remote_guide',
    port: 5576
});


//路由规则
var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST':  //HTTP POST请求路由
            switch(req.url) {
                case '/':
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res);
                    break;
                case '/delete':
                    work.delete(db, req, res);
                    break;
            }
            break;
        case 'GET':  //HTTP GET请求路由
            switch(req.url) {
                case '/':
                    work.show(db, res);
                    break;
                case '/archived':
                    work.showArchived(db, res);
            }
            break;
    }
});

db.query(
    "CREATE TABLE IF NOT EXISTS t_work ("  //建表SQL
    + "id INT(10) NOT NULL AUTO_INCREMENT, "
    + "hours DECIMAL(5,2) DEFAULT 0, "
    + "date DATE, "
    + "archived INT(1) DEFAULT 0, "
    + "description LONGTEXT,"
    + "PRIMARY KEY(id))",
    function(err) {
        if (err) throw err;
        console.log('Server started...');
        server.listen(3000, '127.0.0.1');   //启动HTTP服务器
    }
);