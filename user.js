// 封装dao层
const { pool } = require('./pool');

// 查询所有的用户
let findUser = (callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'select * from user01'
            connection.query(sql,(err,result)=>{
                if(err) {
                    console.log(err)
                } else {
                    callback(result)
                    connection.release()
                    connection.destroy()
                }
            })
        }
    })
}

// 根据id查询用户信息
let findById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'select * from user01 where id=?'
            connection.query(sql,[id],(err,result)=>{
                if(err) {
                    console.log(err)
                } else {
                    callback(result)
                    connection.release()
                    connection.destroy()
                }
            })
        }
    })
}

// 新增用户或修改用户
let saveUser = (data,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            if(data.id) {
                // 修改
                let sql = 'update user01 set username=?,password=?,gender=? where id=?'
                connection.query(sql,[data.username,data.password,data.gender,data.id],(err,result)=>{
                    if(err) {
                        console.log(err)
                    } else {
                        result.code = 200
                        result.message = '编辑成功'
                        callback(result)
                        connection.release()
                        connection.destroy()
                    }
                })
            } else {
                // 保存
                let sql = 'insert into user01(id,username,password,gender) values(?,?,?,?)'
                connection.query(sql,[null,data.username,data.password,data.gender],(err,result)=>{
                    if(err) {
                        console.log(err)
                    } else {
                        result.code = 200
                        result.message = '添加成功'
                        callback(result)
                        connection.release()
                        connection.destroy()
                    }
                })
            }
        }
    })
}

// 根据id删除用户
let deleteById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'delete from user01 where id = ?'
            connection.query(sql,[id],(err,result)=>{
                if(err) {
                    console.log(err)
                } else {
                    callback(result)
                    connection.release()
                    connection.destroy()
                }
            })
        }
    })
}

module.exports = {
    findUser,
    findById,
    saveUser,
    deleteById
}