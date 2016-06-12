var http = require('http');
var url=require('url');
var crypto = require('crypto');


var str = encodeURI('功夫熊猫3.特效中英字幕.Kung.Fu.Panda.3.2016.720p.HC.WEBRip.x264.深影字幕组');
//反过来是 dencodeURI


//分词
var opt1={
    hostname:'apis.baidu.com',
    path:'/apistore/pullword/words?source='+ str + '&param1=0&param2=0.5',
    method:'GET',
    headers:{
        'apikey' : '7e68c0b7a3b7afb0b9d0287a8d5d4235'
    }
};


//天气
var opt2={
    hostname:'apis.baidu.com',
    path:'/apistore/aqiservice/aqi?city=%E5%8C%97%E4%BA%AC',
    method:'GET',
    headers:{
        'apikey' : '7e68c0b7a3b7afb0b9d0287a8d5d4235'
    }
};

//豆瓣
var opt3={
    hostname:'api.douban.com',
    path:'/v2/movie/search?q=%E5%8A%9F%E5%A4%AB',
    method:'GET',
};
//youku

var md5 = crypto.createHash('md5')
var sign = md5.update('123456').digest('hex')
var opt4={
    hostname:'openapi.youku.com',
    paht:'/v2/videos/show_basic.json?video_id=XNjY1NDA2MDAw&client_id=b10ab8588528b1b1',
    method:'GET'
}


var body = '';
//发送请求
var requ = http.request(opt4, function(reso){
    reso.on('data', function(d){
        body += d;
        //console.log(body)
    });
    reso.on('end',function(){

        console.log(body)

    });
});
//请求本身失败
requ.on('error', function(e) {
    console.log(e.message);
});
requ.end();


exports.ajax = function(req,res){
    res.render('ajax',{
        title:"ajax测试",
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}

exports.fenci = function(req,res){
    res.render('fenci',{
        title:"分词",
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}

exports.jQueryAjax = function(req,res){
    res.render('jQueryAjax',{
        title:"jQueryAjax",
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}

exports.filedouban = function(req,res){
    res.render('mf_filedouban',{
        title:"文件md5分词豆瓣电影",
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}


exports.rtmpPlay = function(req,res){
    res.render('rtmp_play',{
        title:"rtmp_play",
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
}



exports.select = function(keyword) {
    var ret = [];
    if (keyword) {
        keyword = keyword.toLowerCase();
        for (var i = 0, len = TEST_DATA.length; i < len; ++i) {
            if (TEST_DATA[i].toLowerCase().indexOf(keyword) == 0) {
                ret.push(TEST_DATA[i])
            }
        }
    }
    return ret;
}

exports.keywords = function(req, resp) {
    var keyword = req.query.keyword;
    if (!keyword) {
        keyword = req.body.keyword;
    }
    var retlist = select(keyword);

    setTimeout(function() {
        resp.json(retlist);
    }, 2000);
};

var TEST_DATA = ['c#从入门到精通',
    'c++ primer', 'Object c语言基础',
    'HTML5 and CSS3', 'canvas api',
    'android体系结构', 'Bootstrap 精讲',
    'Javascript高级编程', 'Java Web开发',
    'Express框架指南'];

function select(keyword) {
    var ret = [];
    if (keyword) {
        keyword = keyword.toLowerCase();
        for (var i = 0, len = TEST_DATA.length; i < len; ++i) {
            if (TEST_DATA[i].toLowerCase().indexOf(keyword) == 0) {
                ret.push(TEST_DATA[i])
            }
        }
    }
    return ret;
}
