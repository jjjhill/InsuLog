var mysql=require('mysql');
 var connection=mysql.createPool({

   host:'127.0.0.1',
   user:'test',
   password:'test',
   database:'insulogDB',
   port:'3306',

});

 module.exports=connection;
