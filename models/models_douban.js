var mongodb = require('./db_mf');



exports.findDoubanDetail = function(doubanData,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('douban',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                id:doubanData.id
            },function(err,result){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                callback(null,result);
            })
        })
    })
}

//插入豆瓣详细数据
exports.insertDoubanDetail = function(doubanData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取 users集合
        db.collection('douban',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将用户信息插入users集合
            collection.insert(doubanData, {
                safe: true
            },function(err,result){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                callback(null,result);//成功！err为null，并返回存储后的用户文档

            })
        })
    })
}


var updateDocument = function(db, callback) {
// Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateMany({ a : 2 }
        , { $set: { b : 5 } }, function(err, result) {
            console.log("Updated the document with the field a equal to 2");
            console.warn(result.result.n)
            callback(result.result.n);
        });
}

//更新豆瓣评论数据
exports.updateDoubanDetail = function(doubanData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        db.collection('douban',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            collection.updateMany(
                { id : doubanData.id },
                { $set: {
                    rating : doubanData.rating,
                    comments_count : doubanData.comments_count,
                    update : doubanData.update,
                    ratings_count : doubanData.ratings_count

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

exports.insertDoubanCommit = function(doubanCommit,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取 users集合
        db.collection('doubanCommit',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将用户信息插入users集合
            collection.insertMany(doubanCommit, {
                safe: true
            },function(err,result){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                callback(null,result);//成功！err为null，并返回存储后的用户文档

            })
        })
    })
}
//查找豆瓣评论已存在的评论id
exports.findDoubanCommits = function(doubanid,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('doubanCommit',function(err,collection){

            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.find({
                doubanid:doubanid
            }).toArray(function(err,docs){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                callback(docs);
            })
        })
    })
}

exports.findOneDoubanCommit = function(commentid,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('doubanCommit',function(err,collection){

            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.find({
                commentid:commentid
            }).toArray(function(err,docs){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                callback(docs);
            })
        })
    })
}

