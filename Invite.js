const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'


function project_invite(){
  // 프로젝트 아이디 , 엑세스토큰, 초대보낼 이메일 받아오기
  accessToken = localStorage.getItem('accessToken');
  projectid = localStorage.getItem('projectid');
  const email = document.getElementById("mail").value;
  // 보낼데이터 JSON화
  inviteData= JSON.stringify({
    email: email,
    projectId: projectid
  })

  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/invite', true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        alert('invite sended')
        //홈화면으로
        location.href='./Home.html';
        }
        else {
        // 오류시 localStorage를 초기화하고 로그인화면으로
        localStorage.clear();
        location.href='./Login.html';
      }
    }
  }
  xhr.send(inviteData);
}