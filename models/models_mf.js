var mongodb = require('./db_mf');



exports.findFile = function(fileData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('mfile',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                fShortFileID:fileData.fShortFileID
            },function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            })
        })
    })
}

exports.insertFile = function(fileData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取 users集合
        db.collection('mfile',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将用户信息插入users集合
            collection.insert(fileData, {
                safe: true
            },function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);//成功！err为null，并返回存储后的用户文档
            })
        })
    })
}


exports.updateFile = function(fileData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        db.collection('mfile',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            collection.updateMany(
                { fShortFileID : fileData.fShortFileID },
                { $set: {
                    fLongFileID : fileData.fLongFileID,
                    fFileName : fileData.fFileName,
                    doubanID : fileData.doubanID,
                    update : fileData.update,
                    imdbID : fileData.imdbID

                } },
                function(err,result){
                    if(err){
                        mongodb.close();
                        return callback(err);
                    }
                    callback(null,result);//成功！err为null，并返回存储后的用户文档

                })
        })
    })
}
