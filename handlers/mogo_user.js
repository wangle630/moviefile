/**
 * Created by Ler on 16/1/26.
 */
var crypto = require('crypto');
var User = require('../models/user.js');

//打开注册页面
exports.mogo_reg = function (req, res) {
    res.render('reg',{
        title:'注册',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
};

//提交注册请求
exports.mogo_post_reg = function (req, res) {
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检查两次密码是否一致
    if(password_re != password){
        req.flash('error','两次输入一样');
        return res.redirect('/reg');
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name : name,
        password : password,
        email : req.body.email
    });
    //检查用户名是否已经存在
    User.get(name, function (err, user) {
        if (user) {
            req.flash('error', '用户已存在!');
            return res.redirect('/reg');//返回注册页
        }
        //如果不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');//注册失败返回主册页
            }
            req.session.user = user;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页
        });
    });
};


//打开登录页
exports.mogo_login = function(req,res){
    res.render('login',{
        title:'登录',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    });
};

//提交登录
exports.mogo_post_login = function(req,res){
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name,function(err,user){
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('/login');//用户不存在则跳转到登录页
        }
        //检查密码是否一致
        if(user.password != password){
            req.flash('error','密码错误');
            return res.redirect('/login');
        }
        //用户和密码匹配后存入session
        req.session.user = user;
        req.flash('success','登录成功');
        res.redirect('/');//登录成功后，跳转到首页
    })
};

