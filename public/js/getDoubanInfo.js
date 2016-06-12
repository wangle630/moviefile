//根据豆瓣ID查询电影详情,返回豆瓣的JSON数据
function getDoubanDetail(alt, callback) {
    alt = 'http://api.douban.com/v2/movie/subject/' + alt + '?callback=?'
    $.getJSON(alt).done(function (data) {
        //返回获取的JSON对象数据
        data.update = $.now();
        gDOUBANDATA = data ;
        callback(data)
    }).fail(function (err) {
        alert('查找失败！' + err)
    });
}


//根据按钮生成电影列表
function getDouBanMovieList(t) {
    $('#dblist').text('');
    var url = 'http://api.douban.com/v2/movie/search?q=' + t
    var doubanList = []
    $.ajax(url, {
        dataType: 'jsonp'
    }).done(function (data) {
        if (data.subjects.length > 0) {
            $('#dblist').append('<h2>查找到<kbd>' + data.subjects.length + '</kbd>条纪录</h2>')
            for (var i = 0; i < data.subjects.length; i++) {
                $('#dblist').append('<div class="col-md-4  dash-unit thumbnail" style="height: 240px;margin auto;"><a   id="' +
                    data.subjects[i].id +
                    '" onclick="showMachMovie(id)"   ><h1>' +
                    data.subjects[i].id +
                    '</h1><h6>' +
                    data.subjects[i].year + '年  ' +
                    '</h6><h6>' +
                    data.subjects[i].title +
                    '</h6><img src="' +
                    data.subjects[i].images.medium +
                    '"  alt="...">' +
                    '</p></a></div>')
                doubanList.push(data.subjects[i].id);
            }
            //saveAllMovieList(doubanList)
        } else {
            $('#dblist').append('<h3>查找到<kbd>0</kbd>条纪录</h3>')
        }
    }).fail(function () {
        alert('查找失败');
    });
}







function getDoubanComments() {

    if(gDOUBANDATA.id){
        $.ajax({
            type: 'post',
            url: '/spider',
            data: {
                doubId: gDOUBANDATA.id,
            },
            success: function (data) {
                alert(data)
            },
            error: function (err) {
                $('#frontConsole').append(err + '\r\n')
            }
        });
    }else
    {
        alert('无访豆瓣数据')
    }


}