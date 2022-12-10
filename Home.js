const $address = 'http://ec2-3-38-185-131.ap-northeast-2.compute.amazonaws.com'

//윈도우 실행시
window.onload = function(){
// storage에 저장된 accessToken과 email 받아오기  
  accessToken = localStorage.getItem('accessToken');
  email = localStorage.getItem('email');

  // 화면 정보 받아들이고 만들기
  // 순서는 1 프로젝트 초대받은것 2 프로젝트들 데이터
  // 프로젝트 초대받은것 보여주기
  // 프로젝트들
  load_invitations();
  setTimeout(function() {
    load_project_data(); //초대화면 아래에 프로젝트 데이터가 나오도록
},50);
}
// 프로젝트 데이터 가져오기
function load_project_data(){
  // json 형식으로 가져와서 저장
  var data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/projects?email='+email, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        // console.log(xhr.responseText);
        //변환하여 저장
        data = JSON.parse(xhr.responseText);
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
    if(data==undefined){
    // 프로젝트가 없습니다
    const element1 = document.getElementById('projects');
    const noprojectdiv = document.createElement('div')
    noprojectdiv.classList.add('newdiv');
    noprojectdiv.append(document.createTextNode("프로젝트가 없습니다!"));
    element1.append(noprojectdiv);
    } else {
      for(let i=0; i<data.length; i++){
      // json 형식으로 가져온걸로 프로젝트 화면만들기~~
        makediv(data[i].id, data[i].title, data[i].description)
      }
    }
  }
}

// 프로젝트들 있는 화면 만들기 div 만들어서 표현
function makediv(projectid,title,description){
  //추가할 위치 설정
  const element = document.getElementById('projects');
  // div들 만들기
  const newdiv = document.createElement('div');
  const newtextwrapdiv = document.createElement('div');

  const newdeletediv = document.createElement("button");
  //삭제하는 div에 스타일추가
  newdeletediv.classList.add('deletediv');
  //삭제하는 div에 내용추가
  const deletediv_text = document.createTextNode("Delete");
  newdeletediv.append(deletediv_text);


  // newdiv에 스타일 설정
  newdiv.classList.add('newdiv');
  // newdiv에 객체 id 설정
  newdiv.id = projectid;

  // 프로젝트 누를시 이동하는함수
  newtextwrapdiv.onclick = function(){ 
    //클릭될시 projectid를 로컬 스토리지에project id로 저장
     localStorage.setItem('projectid',projectid);
    // 페이지 이동
    location.href="./Task/DnD.html";
  }
  
  // 프로젝트 삭제하는 oncllick 함수
  newdeletediv.onclick = function(){
    projectdelete(projectid);
  }


  const newtitle_div = document.createElement('div');
  newtitle_div.classList.add('title')

  const newdescription_div = document.createElement('div');
  newdescription_div.classList.add('describe')
  //받아온 내용을 div에 추가
  newtitle_div.append(document.createTextNode(title));
  newdescription_div.append(document.createTextNode(description));

  newtextwrapdiv.append(newtitle_div,newdescription_div);
  newdiv.append(newtextwrapdiv,newdeletediv);

  element.append(newdiv);
}

// 프로젝트 삭제
function projectdelete(projectid){
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", $address+'/project/'+projectid, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        //성공시 페이지 refresh
        window.location.reload();
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

// 아래부터는 초대관련
function load_invitations(){
  var invitationsData
  var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/invitations?email='+email, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        //JSON으로 변환하여 저장
        invitationsData = JSON.parse(xhr.responseText);
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
    if(invitationsData==undefined){
    } else {
      for(let i=0; i<invitationsData.length; i++){
        // json 형식으로 가져온걸로 화면만들기~~
        makeinvitations(invitationsData[i].invitationId, invitationsData[i].projectName)
      }
    }
  }
}

// 초대받기화면만들기
function makeinvitations(invitationId,projectName){
  const element = document.getElementById('projects');
  
  const newdiv = document.createElement('div');
  newdiv.classList.add('inviteWrapper'); //<div class=invitewrapper>

  const newtextdiv = document.createElement('div');
  const newacceptdiv = document.createElement('div');
  const newdenydiv = document.createElement('div');

  newdenydiv.append(document.createTextNode('Deny'));
  newacceptdiv.append(document.createTextNode('Accept'));

  newacceptdiv.onclick = function (){
    acceptproject(invitationId);
  }

  newdenydiv.onclick = function (){
    newdiv.remove();
    console.log("a");
    denyproject(invitationId);
  }

  newtextdiv.classList.add('invitationdiv');
  newacceptdiv.classList.add('acceptdiv');
  newdenydiv.classList.add('denydiv');

  newtextdiv.append(document.createTextNode(projectName));
  newdiv.append(newtextdiv,newacceptdiv,newdenydiv);
  element.append(newdiv);
}

function acceptproject(invitationId){
  var xhr = new XMLHttpRequest();
  console.log(invitationId);
  xhr.open("POST", $address+'/invitation/accept/'+invitationId, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        alert("invitation accept!");
        //페이지 refresh
        window.location.reload();
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

function denyproject(invitationId){
  var xhr = new XMLHttpRequest();
  console.log(invitationId);
  xhr.open("DELETE", $address+'/invitation/'+invitationId, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        //alert("invitation accept!");
        //페이지 refresh
        window.location.reload();
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