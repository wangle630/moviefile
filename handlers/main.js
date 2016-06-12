var Post = require('../models/post.js');

exports.logout = function(req,res){
        req.session.user = null;
        req.flash('success','登出成功');
        res.redirect('/');//跳转到首页
};

exports.upload = function(req,res){
    res.render('upload',{
        title:'文件上传',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}

exports.post_upload = function(req,res){
    req.flash('success').toString();
    res.redirect('/upload');
}

exports.links = function(req,res){
    res.render('links',{
        title:"友情链接",
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}


