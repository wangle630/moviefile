/**
 * Created by Ler on 16/4/1.
 */




//根据豆瓣JSON数据显示豆瓣电影信息
function showDoubanDetail(doubanData) {

    $('#txtDouBanID').val('')
    $('#txtDouBanRate').val('')
    $('#txtOriginalTitle').val('')

    $('#txtImadbID').val('')
    $('#txtOmdbRate').val('')
    $('#txtOmdbRated').val('')

    $('#txtTomatoURL').val('')
    $('#txtTomatoRate').val('')
    $('#txtTomatoUserRate').val('')

    $('#txtDouBanID').val(doubanData.id)
    $('#txtDouBanRate').val(doubanData.rating.average)
    $('#txtOriginalTitle').val(doubanData.original_title)
}


//根据omdbJOSN数据，显示omdb电影信息
function showOmdbDetail(omdbData) {

    $('#txtImadbID').val(omdbData.imdbID)
    $('#txtOmdbRate').val(omdbData.imdbRating)
    $('#txtOmdbRated').val(omdbData.Rated)
    $('#txtTomatoURL').val(omdbData.tomatoURL)
    $('#txtTomatoRate').val(omdbData.tomatoRating)
    $('#txtTomatoUserRate').val(omdbData.tomatoUserRating)
}

//显示文件基本信息
function showFileInfo(file) {

    $("#txtFileResolution").val('')
    $("#txtMovieType").val('')
    $("#fenciResult").text('');
    $("#txtFileFormat").val('');
    $("#txtFileName").val('')
    $("#txtFileType").val('')
    $("#txtFileSize").val('')
    $("#txtSubtitleType").val('')
    $("#txtShortFileID").val('')
    $("#txtLongFileID").val('')

    console.log(file.name)

    if ((file.name.indexOf('720') >0)  || (file.name.indexOf('1280') >0 )) {
        $("#txtFileResolution").val('720')
    }

    if ((file.name.indexOf('1080') > 0) || (file.name.indexOf('1920') > 0)) {
        $("#txtFileResolution").val('1080')
    }


    if (file.name.indexOf('韩版') >0 ) {
        $("#txtMovieType").val('韩版')
    }

    if (file.name.indexOf('高清') >0 ) {
        $("#txtMovieType").val('高清')
    }

    if (file.name.indexOf('TS') >0 ) {
        $("#txtMovieType").val('TS')
    }

    if (file.name.indexOf('中英') >0 ) {
        $("#txtSubtitleType").val('中英')
    }

    if (file.name.indexOf('中字') >0 ) {
        $("#txtSubtitleType").val('中字')
    }

    var arr = file.name.split(".");
    $("#txtFileFormat").val(arr[arr.length - 1]);
    $("#txtFileName").val(file.name)
    $("#txtFileType").val(file.type)
    $("#txtFileSize").val(file.size)

    $('#fenciResult').append('<button class="btn btn-warning btn-xs col-md-12 " id=' +
        file.name + ' onclick="getDouBanMovieList(this.id)">' + file.name + '</button>')

}