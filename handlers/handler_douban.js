//var mongodb = require('../models/db_mf');
//var mongodb = require('../models/db_mf');

var doubanModel = require('../models/models_douban.js');
var omdbModel = require('../models/models_omdb.js');
var fileModel = require('../models/models_mf.js');


exports.douban_save = function (req, res) {
    req.setMaxListeners(0);
    doubanModel.findDoubanDetail(req.body, function (err, data) {
        if (err) {
            res.send('豆瓣查询出错了')
        } else if (data) {
            doubanModel.updateDoubanDetail(req.body, function (err, row) {
                if (err) {
                    res.send('豆瓣更新出错了')
                } else if (row) {
                    res.send('豆瓣更新成功:' + row)
                } else {
                    res.send('豆瓣没有取得更新结果？')
                }
            })
        } else {
            doubanModel.insertDoubanDetail(req.body, function (err, row) {
                if (err) {
                    res.send('豆瓣保存出错了')
                } else if (row) {
                    res.send('豆瓣保存成功:' + row.insertedIds)
                } else {
                    res.send('豆瓣没有取得保存结果？')
                }
            })
        }
    })
};



exports.omdb_save = function (req, res) {
    req.setMaxListeners(0);
    omdbModel.getomdb(req.body, function (err, data) {
        if (err) {
            res.send('omdb查询出错了')
            console.log(err);
        } else if (data) {
            omdbModel.updateOmdbDetail(req.body, function (err, row) {
                if (err) {
                    res.send('omdb更新出错了')
                } else if (row) {
                    res.send('omdb更新成功:' + row)
                } else {
                    res.send('omdb没有取得更新结果？')
                }
            })
        } else {
            omdbModel.saveomdb(req.body, function (err, row) {
                if (err) {
                    res.send('omdb保存出错了')
                } else if (row) {
                    res.send('omdb保存成功:' + row.insertedIds)
                } else {
                    res.send('omdb没有取得保存结果？')
                }
            })
        }
    })
};

exports.file_save = function (req, res) {
    req.setMaxListeners(0);
    fileModel.findFile(req.body, function (err, data) {
        if (err) {
            res.send('查询File出错了')
            console.log(err);
        } else if (data) {
            //res.send(data.fShortFileID)
            fileModel.updateFile(req.body, function (err, row) {
                if (err) {
                    res.send('file更新出错了')
                } else if (row) {
                    res.send('file更新成功:' + row)
                } else {
                    res.send('file没有取得更新结果？')
                }
            })
        } else {
            fileModel.insertFile(req.body, function (err, row) {
                if (err) {
                    res.send('file保存出错了')
                } else if (row) {
                    res.send('file保存成功:' + row.insertedIds)
                } else {
                    res.send('file没有取得保存结果？')
                }
            })
        }
    })
};