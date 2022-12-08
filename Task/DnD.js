const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'



window.onload=function(){
	accessToken = localStorage.getItem('accessToken');
	projectId = localStorage.getItem('projectid');

	GetTaskData("TODO");
	GetTaskData("IN_PROGRESS");
	GetTaskData("RESOLVED");
}

function GetTaskData(Status){
	var xhr = new XMLHttpRequest();
	var data;
  xhr.open("GET", $address+'/task/'+projectId+'?status='+Status, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            }
            else {
				      // 오류시 localStorage를 초기화하고 로그인화면으로
							localStorage.clear();
							location.href='/LogIn.html';
            }
        }
    }
  xhr.send();
	xhr.onload = function(){
		data = JSON.parse(xhr.responseText);
		for(let i=0; i<data.length; i++){
      // json 형식으로 가져온걸로 프로젝트 화면만들기~~
        makediv(data[i].description, data[i].id, data[i].score, data[i].taskName,data[i].taskStatus);
		}
	}
}

function makediv(description,id,score,taskName,taskStatus){
  //추가할 위치 설정
  const element = document.getElementById(taskStatus);
	// div들 만들기
  const newdiv = document.createElement('div');
	newdiv.setAttribute('draggable','true');
	newdiv.setAttribute('ondrag','drag(event)');
	newdiv.classList.add('list-item');
  // div마다 task id 설정
	newdiv.id=id;
	
	const newdescription = document.createElement('div');
	const newscore = document.createElement('div');
	const newtaskName = document.createElement('div');

	newdescription.append(document.createTextNode(description));
	newscore.append(document.createTextNode(score));
	newtaskName.append(document.createTextNode(taskName));

	newdiv.append(newtaskName,newdescription,newscore);

  element.append(newdiv);
}

function drag(ev) {
	dragdata = ev.target;
	ev.dataTransfer.setData("text", ev.target);
}

function drop(ev) {
	if(ev.target.id === "IN_PROGRESS"||ev.target.id === "TODO"||ev.target.id === "RESOLVED"){
		ev.preventDefault();
		ev.target.append(dragdata);
		TaskStatusChange(dragdata.id,ev.target.id);
	}
}

function allowDrop(ev) {
	ev.preventDefault();
}

function TaskStatusChange(taskid,Status){
	var xhr = new XMLHttpRequest();
  xhr.open("PUT", $address+'/task/'+taskid+'?status='+Status, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            }
            else {
				      // 오류시 localStorage를 초기화하고 로그인화면으로
							localStorage.clear();
							location.href='/LogIn.html';
            }
        }
    }
  xhr.send();
}

// poromise 함수를 못써서 dnd함수 새로짯습니다 ㅠㅠ

// function dragStart(){
// const list_items = document.querySelectorAll('.list-item');
// const lists = document.querySelectorAll('.list');

// let draggedItem = null;

// for (let i = 0; i < list_items.length; i++) {
// 	const item = list_items[i];

// 	console.log(item);

// 	item.addEventListener('dragstart', function () {
// 		draggedItem = item;
// 		setTimeout(function () {
// 			item.style.display = 'none';
// 		}, 0)
// 	});

// 	item.addEventListener('dragend', function () {
// 		setTimeout(function () {
// 			draggedItem.style.display = 'block';
// 			draggedItem = null;
// 		}, 0);
// 	})

// 	for (let j = 0; j < lists.length; j ++) {
// 		const list = lists[j];

// 		list.addEventListener('dragover', function (e) {
// 			e.preventDefault();
// 		});
		
// 		list.addEventListener('dragenter', function (e) {
// 			e.preventDefault();
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
// 		});

// 		list.addEventListener('dragleave', function (e) {
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
// 		});

// 		list.addEventListener('drop', function (e) {
// 			console.log('drop');
// 			this.append(draggedItem);
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
// 		});
// 	}
// }
// }
