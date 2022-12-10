// 서버와 연결하려고하는데 그주소
const $address = 'http://ec2-3-38-185-131.ap-northeast-2.compute.amazonaws.com'

// 창이 켜지게되면 실행
window.onload=function(){
  // 로컬스토리지에서 id,accessToken,username 받아오기
  projectid = localStorage.getItem('projectid');
  accessToken = localStorage.getItem('accessToken');
  username = localStorage.getItem('username');
  // 서버로부터 데이터 받아오기
  issue_load()
}

// 이슈들을 확인(즉 데이터받음)
function issue_load(){
  var data;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/issue/'+projectid, true); // 이슈들 확인
  xhr.setRequestHeader('Content-Type', 'application/json'); //형식확인
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken); // 엑세스토큰
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) { //연결 성공시
        // 확인된 데이터들 받기
        data = JSON.parse(xhr.responseText);
      }else{
        localStorage.clear();
        location.href='/LogIn.html';
      }
    }
  }
  xhr.send();
  // 데이터받은걸로 화면만들기
  xhr.onload = function(){
    if(data==undefined){
    // 이슈가 없습니다
    const element111 = document.getElementById('div_middle');
    const noissuediv = document.createElement('div')
    noissuediv.classList.add('newdiv');
    const noissuedivs = document.createTextNode("이슈가 없습니다!");
    noissuediv.append(noissuedivs);
    element111.append(noissuediv);
    } else {
      for(let i=0; i<data.length; i++){
      // json 형식으로 가져온걸로 프로젝트 화면만들기~~
        makediv(data[i].id, data[i].content, data[i].username)
      }
    }
  }
}

//엔터키가 눌렸을때 post issue하기
function enterkey() {
  if (window.event.keyCode == 13) { //엔터키가 눌렸을때
    var textdata = document.getElementById("text").value;
    if(textdata === undefined){
      alert('입력하세요 ㅡㅡ');
    }else{
      
      data = JSON.stringify({
        content: textdata,
      });
      issue_create(data);
    }
    //보냈을때 text의 value 초기화
    text.value = "";
  }
}

// 이슈들 데이터 서버로 보내기
function issue_create(data){
  var data;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/issue/'+projectid, true); // 이슈 생성
  //엑세스토큰
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  // 보낼타입
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) { //연결 성공시
        console.log('success');
        location.href="./issue.html";
        //화면 초기화
      }else if(xhr.status === 400){
        alert('errorcode 400');
      }else{ // 실패시
        console.log('fail');
        //localStorage.clear();
        //location.href='/LogIn.html';
      }
    }
  }
  xhr.send(data); // data 보내기
}


// issue 삭제하기 코드
function issue_delete(deleteid){
  //
  var deleteid;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", $address+'/issue/'+deleteid, true); // 이슈 생성
  // 엑세스토큰
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        // 삭제성공시 페이지 초기화
         location.href="./issue.html";
      }else{ // 실패시
        localStorage.clear();
        location.href='/LogIn.html';
      }
    }
  }
  xhr.send();
}

//확인된 데이터들을 div로 표현
function makediv(issueid,issuecontent,username) {
  // 생성할위치로 이동
  const element = document.getElementById('div-middle');
  // new div 생성
  const newDiv = document.createElement('div');
  // new div class 부여
  newDiv.id = issueid;
  newDiv.classList.add('newDiv');
  // new span 생성
  const element2 = document.getElementById('newdiv');
  const newusernamediv = document.createElement('span');
  const newissuecontentdiv = document.createElement('div');
  // span에 내용넣기
  newusernamediv.appendChild(document.createTextNode(username));
  newissuecontentdiv.appendChild(document.createTextNode(issuecontent));
  // Span들에게 각각의 class 부여하기
  newusernamediv.classList.add('usernamediv')
  newissuecontentdiv.classList.add('issuecontentdiv')

  // 삭제하는 span추가
  const newdeleteissueSpan = document.createElement('button');
  newdeleteissueSpan.appendChild(document.createTextNode('x'));
  newdeleteissueSpan.classList.add('deleteissuebutton');
  newdeleteissueSpan.onclick = function(){
    const deleteid=issueid;
    issue_delete(deleteid);
  }


  // 답글보는 span 추가
  const openIssueChatDiv = document.createElement('button');
  openIssueChatDiv.innerText = "+"
  openIssueChatDiv.classList.add('openissuechat');

  openIssueChatDiv.addEventListener("click",(event)=>{
    const IssueId=issueid;
    console.log(IssueId);
    GetIssueChat(IssueId);
    makechatboard(IssueId);
    transferOpenIssueChatSpan(IssueId);
  });
  // 답글 닫는 span 추가
  const closeIssueChatDiv = document.createElement('button');
  closeIssueChatDiv.innerText = "-";
  closeIssueChatDiv.classList.add('closeissuechat');
  // 기본은 숨겨두는상태
  closeIssueChatDiv.style.display = 'none';

  closeIssueChatDiv.addEventListener("click",(event)=>{
    const IssueId=issueid;
    transferCloseIssueChatSpan(IssueId);
    removeDiv(IssueId);
  });
  // 답글과 입력창 표시해줄 div
  const issueEnterDiv = document.createElement('div');
  issueEnterDiv.className = 'issueEnterDiv'

  // 위에서부터 들어감, 순서가 중요함
  newDiv.appendChild(openIssueChatDiv);
  newDiv.appendChild(closeIssueChatDiv);
  newDiv.appendChild(newusernamediv);
  newDiv.appendChild(newissuecontentdiv);
  newDiv.appendChild(newdeleteissueSpan);
  newDiv.appendChild(issueEnterDiv);

  // new div를 기존 div에 추가
  element.appendChild(newDiv);
}


// 이슈의 채팅 가져오기
function GetIssueChat(IssueId){
	var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/chat/'+IssueId, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
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
    console.log(data);
    for(let i=data.length-1; i>-1; i--){

      // json 형식으로 가져온걸로 프로젝트 화면만들기~~
        makechat(IssueId,data[i].id,data[i].content)
    }
	}
}

function makechat(IssueId,chatid,content){
  const element = document.getElementById(IssueId).querySelector('.issueEnterDiv');

  const newchatdiv = document.createElement('div');
  newchatdiv.className = "chatdiv"
  
  newchatdiv.append(document.createTextNode(content));
  //요소의 맨앞에 위치함
  element.prepend(newchatdiv);
}

function makechatboard(IssueId){
  const element = document.getElementById(IssueId).querySelector('.issueEnterDiv');
  console.log(element);

  const newdiv = document.createElement('div');

  const input = document.createElement('input');

  input.setAttribute('id', "chattext");
  input.setAttribute('name', "text");
  input.setAttribute('placeholder', "send massage press Enter");
  input.setAttribute('onkeyup', "enterkey2()");
  input.setAttribute('class','openchat')
  newdiv.append(input);
  element.append(newdiv);
}

function enterkey2(){
  if (window.event.keyCode == 13) { //엔터키가 눌렸을때
    // 요소의 부모의 부모의 부모의... 의! id 찾아내기, IssueId
    var IssueId = document.getElementById("chattext").parentElement.parentElement.parentElement.getAttribute('id');
    var textdata = document.getElementById("chattext").value
    if(textdata === undefined){
      alert('입력하세요 ㅡㅡ');
    }else{
      data = JSON.stringify({
        content: textdata,
      });
      chat_create(data,IssueId);
    }
    //보냈을때 chattext의 value 초기화
    document.getElementById("chattext").value = "";
  }
}

function transferOpenIssueChatSpan(IssueId){
  // get Elementsbyclassnames는 배열로 작동해서 안됨 쿼리셀렉터로 지정해주어야함
  const openissuechat = document.getElementById(IssueId).querySelector('.openissuechat');
  openissuechat.style.display = 'none';

  const closeissuechat = document.getElementById(IssueId).querySelector('.closeissuechat');
  closeissuechat.style.display = '';
}

function transferCloseIssueChatSpan(IssueId){
  // get Elementsbyclassnames는 배열로 작동해서 안됨 쿼리셀렉터로 지정해주어야함
  const openissuechat = document.getElementById(IssueId).querySelector('.openissuechat');
  openissuechat.style.display = '';

  const closeissuechat = document.getElementById(IssueId).querySelector('.closeissuechat');
  closeissuechat.style.display = 'none';
}

function removeDiv(IssueId){
  let element = document.getElementById(IssueId).querySelector('.issueEnterDiv');
  element.remove(element);
  // 삭제후 다시생성
  element = document.getElementById(IssueId)
  const issueEnterDiv = document.createElement('div');
  issueEnterDiv.className = 'issueEnterDiv'
  element.appendChild(issueEnterDiv);
}

function chat_create(data,IssueId){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/chat/'+IssueId, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
              alert("메시지 보내짐!");
            }
            else {
				      // 오류시 localStorage를 초기화하고 로그인화면으로
              alert("fail");
							//localStorage.clear();
							//location.href='./Login.html';
            }
        }
    }
  xhr.send(data);
}