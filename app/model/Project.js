
/**
id: int, auto_increment,
name
*/

var Project = db.getCollection('projects');
if(!Project){
  Project = db.addCollection('projects');
}

function project_list(){

  return Project.find();
}

function project_info(id){
  id = parseInt(id)
  return Project.find({ $loki : id })
}

function project_create(data){
		Project.insert(data)
    var a = Project.find();
}