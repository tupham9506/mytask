
/**
	id, name, status, project_id, 
*/

// check exist table
var Task = db.getCollection('tasks');

if(!Task){
  Task = db.addCollection('tasks');
}


function task_list(){
	return Task.find();
}

function task_info(project_id){
  return Task.find({project_id: project_id});
}

function task_create(){

}

function task_update(){

}

function task_delete(){
	
}
