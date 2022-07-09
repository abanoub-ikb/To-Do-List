const taskInput = document.querySelector('input');
const submit = document.getElementById('submit');
let tasks = document.querySelector('.tasks');
let taskId = 1;
let tasksArr = [];

// check if there is data in local storage
if(localStorage.getItem('toDoList')){
    tasksArr = JSON.parse(localStorage.getItem('toDoList'));
};

//  display the data from local storage on start
getDataFromLocal();

// collect the data and show it onclick
submit.addEventListener('click',()=>{
    collectTasks ();
    displayTasks(tasksArr);
});

// collect the task in objects and push it in the tasks Array
function collectTasks (){
    if(taskInput.value!==''){
        let taskObj = {
            id : taskId,
            task : taskInput.value,
            done: false,
        };

        tasksArr.push(taskObj);
        setDataInLocal (tasksArr);
    }
    taskId++
    taskInput.value='';
};


// store data in local storage
function setDataInLocal (arr){
    localStorage.setItem('toDoList',JSON.stringify(arr))
};


// show the data in html 
function displayTasks(arr){
    let tasksHtmlContainer = ``;
    arr.map((ele)=>{
        tasksHtmlContainer += `<div data-id="${ele.id}" class="task ${ele.done?'dark-them':''} bg-white col-12 col-md-10 text-start m-auto my-2">
        <p class="m-0 ${ele.done?'completed':''}">${ele.task}</p>
       <div class="task-icon">
       <i class="fa-solid fa-square-check fa-lg done"></i>
       <i class="fa-solid fa-trash fa-lg del"></i></div>
    </div>`
    });
    tasks.innerHTML = tasksHtmlContainer;
};


// get data from local storage function
function getDataFromLocal(){
    let data = localStorage.getItem('toDoList');
    if(data){
        let taskList = JSON.parse(data);
        displayTasks(taskList)
    }
};

// delete the task or mark it as done
tasks.addEventListener('click',function(e){
    let currentElement = e.target.parentElement.parentElement;
    let id = currentElement.getAttribute('data-id');

    if(e.target.classList.contains('del')){
      // remove the element from the page
      currentElement.remove();
    //   remove the task from local storage
      deleteTask(id);
    }
    // change the style of task element depends on the case done or not
    else if(e.target.classList.contains('done')){
        currentElement.firstElementChild.classList.toggle('completed');
        currentElement.classList.toggle('dark-them')
        taskCompleted(id)
    }
});



// delete item 
function deleteTask(id){
    tasksArr = tasksArr.filter((ele)=>{
     return   ele.id != id
    })
    setDataInLocal(tasksArr);
};

// change the statue of the object done or not to save in local storage then change the style depends on the case
function taskCompleted(id){
    for(let i = 0 ; i < tasksArr.length ; i++){
       if(tasksArr[i].id == id){
        tasksArr[i].done == true? (tasksArr[i].done = false) : (tasksArr[i].done = true);
       }
    };
    setDataInLocal(tasksArr);
};

// press enter instead of clicking the button 
taskInput.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        collectTasks ();
        displayTasks(tasksArr);
    }
});
