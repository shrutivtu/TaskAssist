let data = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

let todoname = document.getElementById('todoname');
let listdisp = document.getElementById('list-display');
let myobj = {};
let flag = false;

todoname.addEventListener('keyup', (e) => {
	if(e.keyCode === 13){
		myobj = {
			'id'   : data.length+1,
			'name' : e.target.value,
			'done' : false
		}
		addItem(myobj);
	}
});

const addItem = (obj) => {
	addItemtoDOM(obj);
	document.getElementById('todoname').value = '';
	data.push(obj);
	updatelocalStorage();
}

const updatelocalStorage = () => {
	localStorage.setItem('todos', JSON.stringify(data));
}

const addItemtoDOM = (obj) => {
	let ul = document.createElement('ul');
		ul.classList.add('unorderedlist');

	let li = document.createElement('li');
		li.classList.add('listitem');

	let inpcheck = document.createElement('input');
    	inpcheck.type = "checkbox";
    	inpcheck.name = "id";
    	inpcheck.value = obj.id;
    	inpcheck.className="checkbox";

    	if(obj.done === true){
    		flag = true;
    	}
    	
    	inpcheck.addEventListener('click', () => {
    		if(obj.done === false){
    			obj.done = true;
    			spname.classList.add('checked');
    		}
    		else{
    			obj.done = false;
    			spname.classList.remove('checked');
    		}
    		for(let i = 0; i < data.length; i++){
    			if(data[i].id === obj.id){
    				data[i].done = obj.done;
    			}
    		}
    		console.log(data);
    		updatelocalStorage();
    	});
    
    let spname = document.createElement('span');
	let sptext = document.createTextNode(obj.name);
		spname.appendChild(sptext);
		spname.classList.add('itemname');
		if(flag){
			spname.classList.add('checked');
			flag = false;
		}

	let butdel = document.createElement('button');
    let buttext = document.createTextNode('Delete');
    let mainDiv = document.getElementById('list-display');
    	butdel.appendChild(buttext);
    	butdel.classList.add('del-button')
    	butdel.addEventListener('click', () => {
    		ul.removeChild(li);
    		mainDiv.removeChild(ul);
    		for(let i = 0; i < data.length; i++){
    			if(data[i].id === obj.id){
    				data.splice(i,1);
    				updatelocalStorage();
    			}
    		}
    	});	

    	li.appendChild(inpcheck);
    	li.appendChild(spname);
    	li.appendChild(butdel);
    	ul.appendChild(li);
		listdisp.appendChild(ul);	
}

const rendertodoList = () => {
	//console.log(data);
	for(let i = 0; i < data.length; i++){
		addItemtoDOM(data[i]);
	}
}
rendertodoList();