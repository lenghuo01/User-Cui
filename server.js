const http = require('node:http');
const url = require('url');
const querystring = require('querystring');

const { findUser,findById,saveUser,deleteById } = require('./user.js')

let server = http.createServer((req,res)=>{
    res.writeHead(200, { 
        'Content-Type': 'text/plain;charset=uft-8;',
        'Access-Control-Allow-Origin':'*'
    })
    if(req.method === 'GET') {
        // 请求的地址 path_
        var path_ = url.parse(req.url).pathname
        // 前端发送给给后端的数据
        var params = querystring.parse(url.parse(req.url).query)

        switch(path_) {
            case '/user/findAll':
                findUser((result)=>{
                    // 将从数据库里面查询出来的数据返回给前端
                    res.end(JSON.stringify(result))
                })
                break;
            case '/user/findById':
                // 将前端传递过来的id作为参数发送给findById
                findById(params.id,(result)=>{
                    // 将从数据库里面查询出来的数据返回给前端
                    res.end(JSON.stringify(result))
                })
                break;
            case '/user/deleteById':
                // 将前端传递过来的id作为参数发送给findById
                deleteById(params.id,(result)=>{
                    // 将从数据库里面查询出来的数据返回给前端
                    res.end(JSON.stringify(result))
                })
                break;
            default:
                break;
        }
    }

    if(req.method === 'POST') {
        // 请求的地址 path_
        var path_ = url.parse(req.url).pathname
        switch(path_) {
            case '/user/saveOrUpdate':
                let buffer = Buffer.from([])
                req.on('data', (data)=>{
                  console.log(data)
                    buffer += data
                    saveUser(querystring.parse(buffer.toString()),(result)=>{
                        res.end(JSON.stringify(result))
                    })
                })
                req.on('end', ()=>{})
                break;
        }
        
    }
})

server.listen(6666,()=>{
    console.log('启动成功')
})
