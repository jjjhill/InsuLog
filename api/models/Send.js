var db=require('../dbconnection'); 

var Send={


  addSaved:function(body, callback){
    return db.query("INSERT INTO Saved (name, carbs) VALUES (\'" + body.name + "\', \'" + body.carbs + "\')", callback);
  },
  deleteSaved:function(query, callback){
    return db.query("DELETE FROM Saved WHERE id = \'"+query.id+"\'", callback);
  },
  addLog:function(body, callback){
    return db.query("INSERT INTO Logs (timeLogged, glucose, dose, carbs, isCustomDose, notes) VALUES (\'" + body.currentTime + "\',\'" + body.glucose + "\',\'" + body.dose + "\',\'" + body.carbs + "\',\'" + body.isCustomDose + "\',\'" + body.notes + "\')", callback);
  },


};
module.exports = Send;
