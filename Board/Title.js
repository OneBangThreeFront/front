const $address = 'http://ec2-3-38-185-131.ap-northeast-2.compute.amazonaws.com'

window.onload=function(){
	accessToken = localStorage.getItem('accessToken');
	projectId = localStorage.getItem('projectid');
  GetBoardData()
}

function GetBoardData(){
	var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/board/'+projectId, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            }
            else {
				      // 오류시 localStorage를 초기화하고 로그인화면으로
							localStorage.clear();
							location.href='./Login.html';
            }
        }
    }
  xhr.send();
	xhr.onload = function(){
		data = JSON.parse(xhr.responseText);
		for(let i=0; i<data.length; i++){~
        maketrtd(data[i].description, data[i].id, data[i].name, data[i].priorityStatus,data[i].score);
    }
	}
}

function maketrtd(description,boardid,boardname,priorityStatus,score){
  //추가할 위치 설정
  const element = document.getElementById('storyboard_add');
  const newtr = document.createElement('tr');
  newtr.id = boardid;
  
  newtr.onclick = function (){
    BoardClick(boardid);
  }

  newtr.setAttribute('draggable','true');
	newtr.setAttribute('ondrag','drag(event)');

	const newdescription = document.createElement('td');
	const newboardname = document.createElement('td');
  const newpriorityStatus = document.createElement('td')
	const newscore = document.createElement('td');

	newdescription.append(document.createTextNode(description));
  newdescription.classList.add("text-center");
	newscore.append(document.createTextNode(score));
  newscore.classList.add("text-center");
	newboardname.append(document.createTextNode(boardname));
  newboardname.classList.add("text-center");
  newpriorityStatus.append(document.createTextNode(priorityStatus));
  newpriorityStatus.classList.add("text-center");


	newtr.append(newboardname,newdescription,newscore,newpriorityStatus);

  element.append(newtr);
}


function BoardClick(boardid){
  const result = confirm('Want to add on "My Task?"');

  if(result){
    GetTask(boardid);
  };
}

function GetTask(boardid){
  // 어짜피 task되면 TODO로 가야함.
  data=JSON.stringify({
    taskStatus: "TODO"
  });

  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/task/'+boardid, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            window.open('./Title.html','_self');
            }
            else {
				      // 오류시 localStorage를 초기화하고 로그인화면으로
							localStorage.clear();
							location.href='./Login.html';
            }
        }
    }
  xhr.send(data);
}

function drag(ev) {
	dragdata = ev.target.id;
}

function drop(ev) {
	if(ev.target.id === "DeleteBoard"){
    const result = confirm('Delete the Board?')
    if(result){
      ev.preventDefault();
      DeleteBoard(dragdata);
    }
	}
}

function allowDrop(ev) {
	ev.preventDefault();
}

function DeleteBoard(boardid){
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", $address+'/board/'+boardid, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
             alert("Board Deleted");
             window.open('./Title.html','_self');
            }
            else {
				      // 오류시 localStorage를 초기화하고 로그인화면으로
							localStorage.clear();
							location.href='./Login.html';
            }
        }
    }
  xhr.send();
}
