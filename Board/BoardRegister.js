const example1 = document.querySelector('#cb1');
const example2 = document.querySelector('#cb2');
const example3 = document.querySelector('#cb3');
const example4 = document.querySelector('#cb4');
const example5 = document.querySelector('#cb5');

const low = document.querySelector('#low');
const medium = document.querySelector('#medium');
const high = document.querySelector('#high');

function example_1() {
	if(example1.checked == true) {
    example2.checked = false;
    example3.checked = false;
    example4.checked = false;
    example5.checked = false;
    }
}
function example_2() {
	if(example2.checked == true) {
    example1.checked = false;
    example3.checked = false;
    example4.checked = false;
    example5.checked = false;
    }
}
function example_3() {
	if(example3.checked == true) {
    example1.checked = false;
    example2.checked = false;
    example4.checked = false;
    example5.checked = false;
    }
}
function example_4() {
	if(example4.checked == true) {
    example1.checked = false;
    example2.checked = false;
    example3.checked = false;
    example5.checked = false;
    }
}
function example_5() {
	if(example5.checked == true) {
    example1.checked = false;
    example2.checked = false;
    example3.checked = false;
    example4.checked = false;
    }
}

function ex_1() {
  if(low.checked == true) {
    medium.checked = false;
    high.checked = false;
  }
}

function ex_2() {
  if(medium.checked == true) {
    low.checked = false;
    high.checked = false;
  }
}

function ex_3() {
  if(high.checked == true) {
    medium.checked = false;
    low.checked = false;
  }
}

function boardregister(){
  //그주소
  const $address = 'http://ec2-3-38-185-131.ap-northeast-2.compute.amazonaws.com'
	//엑세스토큰,프로젝트아이디 가져오기
  accessToken = localStorage.getItem('accessToken');
	projectId = localStorage.getItem('projectid');

  //board 정보가져오기
  const description=document.querySelector('#descriptionname').value;
  const name = document.querySelector('#taskname').value;
  const priorityStatus = GetPriorityStatus();
  const score = GetScore();

  console.log(description,name,priorityStatus,score);
  //데이터정리
  data=JSON.stringify({
    description: description,
    name: name,
    priorityStatus: priorityStatus,
    score: score
  });

  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/board/'+projectId, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) { 
             alert("Regist on board is success")
             window.open('Title.html','_self')
          }
          else {
          // 오류시 localStorage를 초기화하고 로그인화면으로
            alert("fail!");
          //localStorage.clear();
          //location.href='./Login.html';
          }
      }
  }
  xhr.send(data);
}


function GetScore(){
  if (document.getElementById('cb1').checked) {
    return "1";
  }else if(document.getElementById('cb2').checked){
    return "2";
  }else if(document.getElementById('cb3').checked){
    return "3";
  }else if(document.getElementById('cb4').checked){
    return "4";
  }else if(document.getElementById('cb5').checked){
    return "5";
  }else{
    alert("Select Scroe");
  }
}

function GetPriorityStatus(){
  if(document.getElementById('low').checked){
    return "LOW";
  }else if(document.getElementById('medium').checked){
    return "MEDIUM";
  }else if(document.getElementById('high').checked){
    return "HIGH";
  }else{
    alert("Select PriorityStatus");
  }
}