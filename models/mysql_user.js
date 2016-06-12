function MSUser(id,name,password,email,default_group_id,Created,Updated){
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.default_group_id = default_group_id;
    this.Created = Created;
    this.Updated = Updated;
}


module.exports = MSUser;

//所有用户注册用户信息
MSUser.getAll = function(db,callback){
    var query = "SELECT * FROM t_account " +  //获取用户信息
        "WHERE default_group_id=? " +
        "ORDER BY Created DESC";
    var default_group_id = 1;
    db.query(
        query,
        [default_group_id],  //想要的工作记录归档状态
        function(err, rows) {
            if (err){
                callback(err)
                //throw err;
            }
            callback(null,rows);
        }
    );
};

//通过用户名取得用户信息
MSUser.getOne = function(db,name,callback){
    var query = "SELECT * FROM t_account " +  //获取用户信息
        "WHERE accountName=? " +
        "limit 1";
    db.query(
        query,
        [name],  //想要的工作记录归档状态
        function(err, row) {
            if (err) console.log(err);
            callback(null,row);
        }
    );
};

//新增注册用户信息
MSUser.prototype.save = function(db,callback){
    //存入数据库的内容
    var MSUser ={
        id : this.id,
        name : this.name,
        password : this.password,
        email : this.email,
        default_group_id: '1',
        Created:this.Created,
        Updated:this.Updated
    };
    var query = "INSERT INTO t_account (id,accountName,Password,email,default_group_id,Created,Updated) " +
        " VALUES (?, ?, ?, ?, ?, ?, ?)" ;
    db.query(
        query,  //添加工作记录的SQL
        [MSUser.id, MSUser.name,MSUser.password,MSUser.email,MSUser.default_group_id,MSUser.Created,MSUser.Updated],
        function(err) {
            if (err){
                console.log(err);
                callback(err);
            }
            callback(null)
        }
    );
};