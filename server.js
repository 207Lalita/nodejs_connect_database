const http = require('http'); //allow to create http server
const express = require('express'), bodyParser = require('body-parser'); //ตรงนี้กับ body parser ทำเพื่อ handle http request & body
const app = express();
app.use(bodyParser.urlencoded({extended:false}));

const mariadb = require('mariadb') //import mariadb package to allow connect nodejs
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'repmaLuffy17!',
    connectionLimit: 5
});

app.get('/test',async(req, res) => {
    let conn; //initialize mariadb connection & call query to read data
    try{
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * from test_job.job')
        console.log(rows);
        const jsonS = JSON.stringify(rows) //ทำให้กลายเป็น obj
        //res.writeHead(200,{'Content-Type': 'test/html'});
        res.writeHead(200, {'Content-Type': 'application/json'});

        res.end(jsonS);
    }catch(e){

    }
});

http.createServer(app).listen(3307, ()=>{
    console.log('Express Server started 3307')
}); //initialized http server port 3306