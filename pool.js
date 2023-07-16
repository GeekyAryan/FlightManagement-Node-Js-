var mysql=require("mysql")
var pool=mysql.createPool(
    { host:'localhost',
    port:3306,
    user:'root',
    password:'root123',
    database:'flightd78',
    multiplestatements:'true'
})
module.exports=pool

