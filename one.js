const $address = 'http://ec2-3-38-185-131.ap-northeast-2.compute.amazonaws.com'

function login(form)
{
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    data = JSON.stringify({
        email: email,
        password: password,
    });

    var xhr = new XMLHttpRequest();
    xhr.open("POST", $address+'/login', true); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { 
                var data=JSON.parse(xhr.response);
                
                localStorage.setItem('accessToken',data.accessToken)
                localStorage.setItem('username',data.username)
                localStorage.setItem('email',email)

                location.href='Home.html';
               
            }
            else {
                alert("Please recheck your email adderss or password.")
            }
        }
    }
    xhr.send(data);
}


function signup(form)
{
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("name").value;

    data = JSON.stringify({
        email: email,
        password: password,
        username: username
    });

    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", $address+'/signup', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json'); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                location.href='Login.html';                                                             
            }
            else {
                alert("Existed email or under 6 letters password.")
            }
        }
    }
    xhr.send(data); //Json형식의 data를 포함하여 요청 전송
}

