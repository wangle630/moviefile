/**
 * Created by Ler on 16/3/31.
 */

//获取完整的文件MD5
function getLongFileID(file) {
    $("#txtLongFileID").val('')

    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = file,
        chunkSize = 2097152, // read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),//创建md5对象
        frOnload = function (e) {
            spark.append(e.target.result); // append array buffer
            currentChunk++;
            if (currentChunk < chunks)
                loadNext();
            else
                $("#txtLongFileID").val(spark.end())
        },
        frOnerror = function (err) {
            console.log(err)
        };

    function loadNext() {
        var fileReader = new FileReader();
        fileReader.onload = frOnload;
        fileReader.onerror = frOnerror;
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };
    loadNext();
}


//获取文件MD5 前2MB＋ 中2MB ＋ 尾2MB
function getShortFileID(file) {
    var md5 = '';
    $("#txtShortFileID").val('')
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = file,
        chunkSize = 2097152,                                // 每次读取文件大小  2MB

        chunks = Math.ceil(file.size / chunkSize),          //一共需要读取几次
        currentChunk = 0,                                   //当前在读地几个

        movieid = '',

        spark = new SparkMD5.ArrayBuffer(),//创建md5对象
        frOnload = function (e) {
            spark.append(e.target.result); // append array buffer
            movieid += spark.end()

            if (movieid.length == 96) {
                md5 += movieid;
                $("#txtShortFileID").val(md5)
                return md5
            }
        },
        frOnerror = function () {
            txtShortFileID.innerHTML += "\noops, something went wrong.";
        };


    function loadchunks(int) {
        var fileReader = new FileReader();
        currentChunk = int;

        fileReader.onload = frOnload;
        fileReader.onerror = frOnerror;

        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };


    if (chunks > 1) {
        loadchunks(1);
        loadchunks(49);
        loadchunks(chunks - 3);
    } else {
        alert('文件太小')
    }

}


//根据“.” 取得分词结果
function fielFenciByDot(filename) {
    var arr = filename.split(".");
    showFenciResult(arr);
}


//JavaScript 取百度分词结果
function fileFenciByBaidu2(filename) {
    // 典型的ajax编程模板
    // 1. 创建XMLHttpReqeust对象
    var xhr = new XMLHttpRequest();
    // 2. open操作初始化请求信息
    xhr.open('GET', 'http://apis.baidu.com/apistore/pullword/words?source=' + filename + '&param1=0&param2=0', true);
    xhr.setRequestHeader("apikey", "7e68c0b7a3b7afb0b9d0287a8d5d4235");

    // 3. 监听事件处理响应结果
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var obj = xhr.responseText.split("\n")
            showFenciResult(obj);
        }
    };
    // 4. send操作发出请求
    xhr.send();

}

//通过jQuerty取得百度分词结果，headers有时候无法插入
function fileFenciByBaidu(filenmae) {
    var url = 'http://apis.baidu.com/apistore/pullword/words?source=' + encodeURI(filenmae) + '&param1=0&param2=0'
    $.ajax(url, {
        cache: false,
        headers: {apikey: '7e68c0b7a3b7afb0b9d0287a8d5d4235',}
    }).done(function (data) {
        var obj = data.split("\n")
        showFenciResult(obj);
    });
}


//处理分词结果   动态生成按钮
function showFenciResult(data) {
    if (data.length) {
        for (var i = 0; i < data.length; i++) {
            $('#fenciResult').append('<button class="btn btn-warning btn-xs col-md-2 " id=' + data[i] + ' onclick="getDouBanMovieList(this.id)">' + data[i] + '</button>')
        }
    }
}