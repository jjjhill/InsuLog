var db=require('../dbconnection'); 

var Retrieve={


  getAllSaved:function(callback) {
    return db.query("SELECT * FROM Saved ORDER BY numUsed DESC", callback);
  },
  getAllLogs:function(callback) {
    return db.query("SELECT * FROM Logs ORDER BY timeLogged DESC", callback);
  },

  
};
module.exports=Retrieve;
