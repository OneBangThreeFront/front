const example1 = document.querySelector('#cb1');
const example2 = document.querySelector('#cb2');
const example3 = document.querySelector('#cb3');
const example4 = document.querySelector('#cb4');
const example5 = document.querySelector('#cb5');

const low = document.querySelector('#low');
const middle = document.querySelector('#middle');
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
    middle.checked = false;
    high.checked = false;
  }
}

function ex_2() {
  if(middle.checked == true) {
    low.checked = false;
    high.checked = false;
  }
}

function ex_3() {
  if(high.checked == true) {
    middle.checked = false;
    low.checked = false;
  }
}

function taskregister(){
  //그주소
  const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'
	//엑세스토큰,프로젝트아이디 가져오기
  accessToken = localStorage.getItem('accessToken');
	projectId = localStorage.getItem('projectid');

  //Task 정보가져오기 이부분 추가가필요함.
  const description="설명";
  const name ="이름";
  const priorityStatus ="HIGH";
  const score = "3";

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
             alert("board regist succes")
          }
          else {
              alert("fail!")
          }
      }
  }
  xhr.send(data);
}



