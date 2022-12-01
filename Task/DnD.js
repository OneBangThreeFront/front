const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
	});

	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
	})

	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];

		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		});

		list.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});

		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
	}
}



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
  xhr.open("GET", $address+'/task/'+projectId+'?status='+Status, true);
	xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            }
            else {
                alert("ㄴㄴ 안됨")
            }
        }
    }
  xhr.send();
	xhr.onload = function(){
		todoData = JSON.parse(xhr.responseText);
		console.log(Status+":"+todoData);
	}
}