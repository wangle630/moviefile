//获取omdb电影信息,并返回omdb结果的JSON对象//http://www.omdbapi.com/
function getOmdbDetail(doubanData, callback) {
    var titles = doubanData.aka
    titles.push(doubanData.original_title)
    for (var i = 0; i < titles.length; i++) {
        $.ajax({
                url: "http://www.omdbapi.com/",
                data: {
                    t: titles[i],
                    plot: 'full',
                    tomatoes: true,
                    r: 'json'
                },
                success: function (omdbData) {
                    if (omdbData.imdbID) {
                        omdbData.update = $.now();
                        gDOUBANDATA.imdbID = omdbData.imdbID
                        gOMDBDATA = omdbData;
                        callback(omdbData);
                    }
                },
                error: function (data) {
                    console.log(data)
                }
            }
        )
    }
}