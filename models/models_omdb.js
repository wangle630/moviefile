var mongodb = require('./db_mf');



exports.getomdb = function(omdbData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取users集合
        db.collection('omdb',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                imdbID:omdbData.imdbID
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


//更新豆瓣评论数据
exports.updateOmdbDetail = function(omdbData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        db.collection('omdb',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            collection.updateMany(
                { imdbID : omdbData.imdbID },
                { $set: {
                    Metascore : omdbData.Metascore,
                    imdbRating : omdbData.imdbRating,
                    imdbVotes : omdbData.imdbVotes,
                    tomatoMeter : omdbData.tomatoMeter,
                    tomatoRating : omdbData.tomatoRating,
                    tomatoReviews : omdbData.tomatoReviews,
                    tomatoFresh : omdbData.tomatoFresh,
                    tomatoUserMeter : omdbData.tomatoUserMeter,
                    tomatoUserRating : omdbData.tomatoUserRating,
                    tomatoUserRating : omdbData.tomatoUserRating,
                    tomatoUserReviews : omdbData.tomatoUserReviews,
                    tomatoURL : omdbData.tomatoURL,
                    update : omdbData.update
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

exports.saveomdb = function(omdbData,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取 users集合
        db.collection('omdb',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将用户信息插入users集合
            collection.insert(omdbData, {
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

