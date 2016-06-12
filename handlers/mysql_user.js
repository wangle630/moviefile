var mysql = require('mysql'); //引入MySQL API

var MSUser = require('../models/mysql_user');
var db = mysql.createConnection({  //连接MySQL
    host:     '125.35.1.38',
    user:     'admin',
    password: 'admin123',
    database: 'remote_guide',
    port: 5586
    //port:5576 开发库
});
var crypto = require('crypto');
//var User = require('../models/user.js');

exports.mysql_reg = function (req, res) {
    res.render('mysql_reg',{
        title:'注册',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
};

exports.mysql_post_reg = function (req, res) {
    //req.body是POST请求信息解析过后的对象，req.body['password'] == req.body.password
    var name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检查两次密码是否一致
    if(password_re != password){
        req.flash('error','两次输入不一样');
        return res.redirect('/mysql_reg');
    }
    var md5 = crypto.createHash('md5'),
        id = md5.update(req.body.name).digest('hex'),
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var newUser = new MSUser(id,name,password,email,'1',date,date);
    //检查用户是否存在
    MSUser.getOne(db, name, function (err, user) {
        if (user.length !== 0) {
            req.flash('error', '用户已存在!');
            return res.redirect('/mysql_reg');
        }
        //如果不存在则新增用户
        newUser.save(db,function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/mysql_reg');//注册失败返回主册页
            }
            req.session.user = newUser;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页
        });
    });
};

//打开登录页
exports.mysql_login = function(req,res){
    res.render('mysql_login',{
        title:'登录',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    });
};

exports.mysql_post_login = function(req,res){
    //req.body是POST请求信息解析过后的对象，req.body['password'] == req.body.password
    var name = req.body.name,
        password = req.body.password;
    //检查用户是否存在
    MSUser.getOne(db, name, function (err, user) {
        if (user.length == 0) {
            req.flash('error', '用户不存在!');
            return res.redirect('/mysql_login');
        }
        if(user[0].Password != req.body.password){
            req.flash('error','密码错误');
            return res.redirect('/mysql_login');
        }
        var currentUser = new MSUser(
            user[0].id,
            req.body.name,
            user[0].password,
            user[0].email,
            '1');

        //用户和密码匹配后存入session
        req.session.user = currentUser;
        req.flash('success','登录成功');
        res.redirect('/');//登录成功后，跳转到首页
    });
}

exports.mysql_userlist = function(req,res){
    MSUser.getAll(db, function(err , rows){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        if(rows){
            res.render('mysql_userlist',{
                title:"MySQL用户列表",
                rows:rows,
                user:req.session.user,
                success:req.flash('success').toString(),
                error:req.flash('error').toString()
            })
        }
    });
}



