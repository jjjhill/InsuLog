var db=require('../dbconnection'); 

var Retrieve={


  getAllSaved:function(callback) {
    return db.query("SELECT * FROM Saved", callback);
  },
  getAllLogs:function(callback) {
    return db.query("SELECT * FROM Logs", callback);
  },

  
};
module.exports=Retrieve;
