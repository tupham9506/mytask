document.write('<script type="text/javascript" src="../model/Task.js"></script>');
document.write('<script type="text/javascript" src="../model/Project.js"></script>');

$(document).ready(function (e) {

	// get project list
	var taskList = task_list();
  var projectList = project_list();
  if(project_list){
    for(var i = 0; i < projectList.length; i++){
      var projectName = projectList[i].name ? projectList[i].name : "Tên chưa xác định";
      var projectDueDate = projectList[i].due_date ? projectList[i].due_date : "";
      var statusLabelType = "", statusLabelContent ="";
      console.log(projectList[i])
      switch(projectList[i].status){
        case '1': 
          statusLabelType ="label-info";
          statusLabelContent = "Đang chờ";
          break;

        case '2': 
          statusLabelType ="label-primary";
          statusLabelContent = "Đang làm";
          break;

        case '3': 
          statusLabelType ="label-success";
          statusLabelContent = "Hoàn thành";
          break;

        case '0': 
          statusLabelType ="label-warning";
          statusLabelContent = "QUá hạn";
          break;

        case '-1': 
          statusLabelContent = "Hủy bỏ";
          break;
      }

      var projectHTML = "<a href='javascript:void(0)' value='" + projectList[i].$loki + "' class='list-group-item'>" + projectDueDate + " - <b>" + projectName + "<span class='label " +  statusLabelType + " pull-right'>" + statusLabelContent +"</span></b></a>";
      $('#projectList').append(projectHTML);
    }
  }
  $('#dueDate').daterangepicker({
    "singleDatePicker": true,
    "autoApply": true,
     "locale": {
        "format": "DD/MM/YYYY",
        "daysOfWeek": ["2","3","4","5","6","7","CN"
        ],
        "monthNames": ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"
        ],
        "firstDay": 0
    },
  });

  $('#projectName label').show();
  $('#projectName input').hide();

  // button action
  $('#cancelCreateTask').hide();

});

$('#createTaskForm').click(function (e) {
  $('#dueDate').val(moment().format('DD/MM/YYYY'));
  $('#startDoDate').val(moment().format('DD/MM/YYYY'));
  $('#endDoDate').val(moment().format('DD/MM/YYYY'));
  selectStatus('1');

  $('#projectName input').show();
  $('#projectName label').hide();

  btnAction('create');
  

})

$('#projectList').click(function(e){
  var id = $(this).val();
  console.log(id)
  var projectInfo = project_info(id);
  var taskInfo = task_info(id);
  console.log(projectInfo)
})

function selectStatus(status){

  $('#btnGroup .btn').removeClass('btn-info');
  $('#btnGroup .btn').removeClass('btn-primary');
  $('#btnGroup .btn').removeClass('btn-success');
  $('#btnGroup .btn').removeClass('btn-danger');
  $('#btnGroup .btn').removeClass('btn-danger');
  $('#btnGroup .btn').addClass('btn-default');

  switch(status){
    case '1': 
      $('#btnGroup [value="1"]').addClass('btn-info');
      break;

    case '2':
      $('#btnGroup [value="2"]').addClass('btn-primary');
      break;

    case '3':
      $('#btnGroup [value="3"]').addClass('btn-success');
      break;
    case '0':
      $('#btnGroup [value="0"]').addClass('btn-danger')
      break;
    case '-1':
      $('#btnGroup [value="-1"]').removeClass('btn-default');
      $('#btnGroup [value="-1"]').removeClass('btn-info');
      $('#btnGroup [value="-1"]').removeClass('btn-primary');
      $('#btnGroup [value="-1"]').removeClass('btn-success');
      $('#btnGroup [value="-1"]').removeClass('btn-danger');
      $('#btnGroup [value="-1"]').removeClass('btn-danger');
      break;
  }
}

// get status
$(".status-btn .btn").click(function(e){
  var id = $(this).attr('value');
  selectStatus(id);
  $('#btnGroup').attr('active-status', id)

})

// cancel create
$('#cancelCreateTask').click(function(){
  btnAction('cancel');
})

function btnAction(action){
  switch(action){
    case 'create':
      $('#createTaskForm').hide();
      $('#cancelCreateTask').show();
      $('#deleteTask').hide();
      break;

    case 'cancel':
      $('#createTaskForm').show();
      $('#cancelCreateTask').hide();
      $('#deleteTask').show();

    case 'view':
      $('#createTaskForm').show();
      $('#cancelCreateTask').hide();
      $('#deleteTask').show();
  }
}

// format content
$('#taskContent').keypress(function(e){
    setTimeout(function(){  
    var enterKey = e.keyCode;
    if(enterKey == 13){
      var content = $('#taskContent').val();
      content += "## ";
      $('#taskContent').val(content);
    }
  }, 0);
});

// save data
$('#save').click(function(){

  // var id = parseInt($('#save').val());
  var contentString = $('#taskContent').val();
  
  
  var status = $('#btnGroup').attr('active-status');

  var taskParam = [];
  
  if(!contentString || contentString.toString().trim().length == 0){  
    $('#errorMessage').html("Nhập nội dung đi bạn êi");
    return;
  }

    var contentArray = contentString.toString().split('## ');
    for(var i = 0; i < contentArray.length; i++){
      taskParam.push({
        content: contentArray[i]
      })
    }

    var projectParams = {
      name: $('#projectName input').val(),
      due_date : $('#dueDate').val(),
      start_do_date : $('#startDoDate').val(),
      end_do_date : $('#endDoDate').val(),
      status : status
    };

    // create project
    project_create(projectParams)



  if(id > 0){

  } else { // create new

  }
})