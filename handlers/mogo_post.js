var Post = require('../models/post.js');
var crypto = require('crypto');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');


exports.home = function (req, res) {
    //判断是否是第一页，并把请求的页数转换成 number 类型
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //查询并返回第 page 页的 10 篇文章
    Post.getTen(null, page, function (err, posts, total) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title: '主页',
            posts: posts,
            page: page,
            isFirstPage: (page - 1) == 0,
            isLastPage: ((page - 1) * 10 + posts.length) == total,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};

exports.post = function(req,res){
    res.render('post',{
        title:'发表',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    });
};

exports.post_post = function(req,res){
    var currentUser = req.session.user,
        tags = [req.body.tag1,req.body.tag2,req.body.tag3],
        post = new Post(currentUser.name,currentUser.head,req.body.title,tags,req.body.post);
    post.save(function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('/');
        }
        req.flash('success','发布成功');
        res.redirect('/');
    })
}

exports.user_post = function(req,res){
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //检查用户是否存在
    User.get(req.params.name,function(err,user){
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('/');
        }
        Post.getTen(user.name,page,function(err,posts,total){
            if(err){
                req.flash('error',err);
                return res.redirect('/');
            }
            res.render('user',{
                title:user.name,
                posts:posts,
                page:page,
                isFirstPage:(page -1) == 0,
                isLastPage:((page-1)*10 + posts.length) == total,
                user:req.session.user,
                success:req.flash('success').toString(),
                error:req.flash('error').toString()
            })
        })
    })
}

exports.user_day_post = function(req,res){
    Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        res.render('article', {
            title: req.params.title,
            post: post,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
};

exports.edit_post = function(req,res){
    var currentUser =req.session.user;
    Post.edit(currentUser.name,req.params.day,req.params.title,function(err,post){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        res.render('edit',{
            title:'编辑',
            post:post,
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        })
    })
};

exports.edit_post_post = function(req,res){
    var currentUser =req.session.user;
    Post.update(currentUser.name,req.params.day,req.params.title,req.body.post,function(err){
        var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        req.flash('success','修改成功啦');
        res.redirect(url);
    })
}

exports.remove_post = function(req,res){
    var currentUser =req.session.user;
    Post.remove(currentUser.name,req.params.day,req.params.title,function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        req.flash('success','删除成功啦');
        res.redirect('/');
    })
}

exports.comment_post = function(req,res){
    var date = new Date(),
        time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "" +date.getHours() + ":"
            + (date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes());
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(req.body.email.toLowerCase()).digest('hex'),
        head = "https://pic1.zhimg.com/8993062b6b00237084be65f96b8fd720_m.jpg";
    var comment = {
        name:req.body.name,
        head:head,
        email:req.body.email,
        website:req.body.website,
        time:time,
        content:req.body.content
    };
    var newComment = new Comment(req.params.name,req.params.day,req.params.title,comment);
    newComment.save(function (err){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        req.flash('success','留言成功');
        res.redirect('back');
    })
}

exports.archive = function(req,res){
    Post.getArchive(function (err,posts){
        if(err){
            req.flash('error',err);
            console.log(err);
            return res.redirect('/');
        }
        res.render('archive',{
            title:'存档',
            posts:posts,
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        })
    })
}

exports.tags = function(req,res){
    Post.getTags(function (err,posts){
        if(err){
            req.flash('error',err);
            return res.redirect('/');
        }
        res.render('tags',{
            title:'标签',
            posts:posts,
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        })
    })
}

exports.tags_tag = function(req,res){
    Post.getTag(req.params.tag,function (err,posts){
        if(err){
            console.log(err);
            req.flash('error',err);
            return res.redirect('/');
        }
        res.render('tag',{
            title:'TAG:' + req.params.tag,
            posts:posts,
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        })
    })
}

exports.search = function(req,res){
    Post.search(req.query.keyword,function(err,posts){
        if(err){
            console.log(err)

            req.flash('error',err);
            return res.redirect('/');
        }
        res.render('search',{
                title:"SEARCH:" + req.query.keyword,
                posts:posts,
                user:req.session.user,
                success:req.flash('success').toString(),
                error:req.flash('error').toString()
            }
        )
    })
}