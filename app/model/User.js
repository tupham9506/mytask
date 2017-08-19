// check exist table
var User = db.getCollection('users');

if(!User){
  User = db.addCollection('users');
}

var userInfo = User.findOne();
if(!userInfo){
	User.insert({
		name: "unknown",
		show_tip: 1
	})
	userInfo = User.findOne();
}