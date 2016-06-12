/**
 needs changes config
 /routes/admin.js 10、11
 /routes/videoRoutes.js 10、11
 /public/javascript/mysql/mysql.js
 */


//database local
exports.dev_db_ip = '125.35.1.38';
exports.dev_db_user='admin';
exports.dev_db_password='admin123';
exports.dev_db_database='remote_guide';
exports.dev_db_port=5576;

//database public
exports.test_db_ip = '127.0.0.1';
exports.test_db_user='root';
exports.test_db_password='root123';
exports.test_db_database='remote_guide';
exports.test_db_port=3306;

//interface local
exports.dev_api_ip='125.35.1.38';
exports.dev_api_port=5590;

//interface public
exports.test_api_ip='127.0.0.1';
exports.test_api_port=8090;

//test Auth interface url
//http://localhost:8000/v/Auth?username=002&service_code=LXZNYJCS&challenge=b0a93575309a9acb8d6b49018d740304&response=56b4601ddce60348dee58d755908908d&authen_mode=3
