
/**
id: int, auto_increment,
name
*/

var Project = db.getCollection('projects');
if(!Project){
  Project = db.addCollection('projects');
}

function project_list(offset){
  if(!offset) offset = 0;
  
  return Project
  .chain()
  .find()
  .simplesort('due_date', true)
  .offset(offset)
  .limit(10)
  .data();
}

function project_info(id){
  id = parseInt(id)
  return Project.find({ $loki : id })
}

function project_create(data){
		Project.insert(data)
}

function project_update(data){
    Project.update(data)
}

function project_count(){
  return Project.chain().find().collection.data.length;
}