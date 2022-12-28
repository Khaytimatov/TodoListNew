renderTodos()

let taskInputValue = document.getElementById('userInput')
let addTaskBtn = document.getElementById('push')
let saveTaskBtn = document.getElementById('save')
let deleteAll = document.getElementById('deleteAll')
let searchInput = document.getElementById('searchBar')

function getStorage() {
    let todos;
    let webtasks = localStorage.getItem('localtasks');
    if (webtasks == null) {
        todos = [];
    } else {
        todos = JSON.parse(webtasks);
    }
    return todos;
}

function setStorage(data) {
    localStorage.setItem('localtasks', JSON.stringify(data))
}

addTaskBtn.addEventListener('click', () => {
    addToStorage()
})

function addToStorage() {
    let addTaskInputVal = taskInputValue.value;
    if (addTaskInputVal.trim() != 0) {
        let todos = getStorage();
        todos.push(addTaskInputVal);
        setStorage(todos)
        taskInputValue.value = ''
        renderTodos()
    } else {
        let snackBar = document.getElementById('snackBar');
        snackBar.className = 'show';
        setTimeout(function () {
            snackBar.className = snackBar.className.replace('show', '');
        }, 3000)
    }

}

function renderTodos() {
    let addedTasksList = document.getElementById('tasks')
    let todos = getStorage();
    let html = '';
    todos.forEach((el, index) => {
        html += `<div id="task">
            <span id="taskName">
                ${index + 1}. ${el}
            </span>
            <div id="actions">
                <button id="delete" onclick="deleteTasks(${index})"><ion-icon name="trash"></ion-icon>Delete</button>
                <button id="done" onlick="doneTasks(${index})"><ion-icon name="checkmark-done"></ion-icon>Done</button>
                <button id="edit" onclick="editTasks(${index})"><ion-icon name="create"></ion-icon>Edit</button>
            </div>
        </div>`
    })
    if (todos.length != 0) {
        addedTasksList.innerHTML = html;
    } else {
        addedTasksList.innerHTML = `<span id="noTasks">There are not tasks to show...</span>`;
    }

}

function editTasks(index) {
    let todos = getStorage();
    taskInputValue.value = todos[index];
    let saveIndex = document.getElementById('saveIndex');
    saveIndex.value = index;
    addTaskBtn.style.display = 'none';
    saveTaskBtn.style.display = 'block';
}

saveTaskBtn.addEventListener('click', () => {
    saveTasks()
})
function saveTasks() {
    let todos = getStorage()
    saveIndex = document.getElementById('saveIndex').value;
    todos[saveIndex] = taskInputValue.value;
    setStorage(todos)
    renderTodos()
    taskInputValue.value = '';
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
}

function deleteTasks(index) {
    let todos = getStorage();
    todos.splice(index, 1);
    setStorage(todos);
    renderTodos()
}
// function doneTasks(index) {
//     let todos = getStorage();
//     taskInputValue.value = todos[index];
//     taskInputValue.value.style.textDecoration = 'line-through'
//     setStorage(todos);
//     renderTodos()
// }

deleteAll.addEventListener('click', () => {
    deleteAllTasks()
})
function deleteAllTasks() {
    let todos = getStorage()
    if (todos != null) {
        todos = []
    }
    setStorage(todos)
    renderTodos()
    taskInputValue.value = '';
    addTaskBtn.style.display = 'block';
    saveTaskBtn.style.display = 'none';
}

searchInput.addEventListener('input',searchTasks)

function searchTasks() {
    InputValue = searchInput.value;
    inputValue = inputValue.replace(/^./, str => str.toUpperCase());
    let tasks = document.querySelectorAll('#task');
    Array.from(tasks).forEach(function (el) {
        let taskTxt = el.getElementsByTagName('span')[0].innerText;
        if (taskTxt.includes(inputValue)) {
            el.style.display = 'block'
            el.style.display = 'flex'
        } else {
            el.style.display = 'none'
        }
    })
} 





















// const createTask = () => {
//     const message = document.querySelector('input')
//     const task = {
//         id: new Date().toISOString(),
//         message: message.value,
//         status: false,
//         date: new Date()
//     }
//     let todos = getStorage()
//     todos = [task, ...todos]
//     setStorage(todos)
//     renderTodos()
// }

// const message = document.querySelector('input')
// form.addEventListener('submit', e => {
//     e.preventDefault()
//     if (message.value === '') {
//         alert('nedostato4no')
//     } else {
//         createTask()
//         console.log(todos);
//     }
// })

// const renderTodos = () => {
//     const output = document.querySelector('#output')
//     const input = document.querySelector('input')
//     let todos = getStorage();
//     let html = '';
//     output.innerHTML = html;
//     input.value = ''
//     todos.forEach((el, index) => {
//         const block = document.createElement('div')
//         const buttons = document.createElement('div')
//         const message = document.createElement('p')
//         const statusMessage = document.createElement('p')
//         const dateDom = document.createElement('p')

//         const deleteTodo = document.createElement('button')
//         const imageDelete = document.createElement('img')
//         const imageDone = document.createElement('img')
//         const imageEdit = document.createElement('img')
//         const doneTodo = document.createElement('button')
//         const editTodo = document.createElement('button')

//         deleteTodo.textContent = 'DELETE'
//         block.className = 'task'
//         buttons.className = 'buttons'
//         doneTodo.textContent = el.status
//             ? 'NOT DONE'
//             : 'DONE'
//         editTodo.textContent = 'EDIT'

//         message.textContent = `${index + 1}.${el.message}`
//         message.className = 'msgName'
//         message.style.textDecoration = el.status === true
//             ? 'line-through'
//             : ''
//         imageDelete.src = '/images/trash.svg'
//         imageDone.src = '/images/checkmark-done.svg'
//         imageEdit.src = '/images/create.svg'
//         imageDelete.className = 'imageDlt'
//         imageDone.className = 'imageDn'
//         imageEdit.className = 'imageEdt'
//         statusMessage.textContent = el.status
//             ? 'TODO IS DONE'
//             : 'YOUR TODO IS NOT DONE'

//         block.style.background = el.status
//         // ? 'lightgreen'
//         // : 'red'

//         const date = el.date

//         // const currentDate = `Date: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`


//         // dateDom.textContent = currentDate


//         imageDone.addEventListener('click', () => {
//             doneFunc(el.id)
//         })

//         imageDelete.addEventListener('click', () => {
//             if (el.status === true) {
//                 deleteFunc(el.id)
//             } else {
//                 alert('not a done')
//             }

//         })

//         imageEdit.addEventListener('click', () => {

//             if (el.status === false) {
//                 editFunc(el.id)
//             } else {
//                 alert('its done')
//             }

//         })

//         buttons.append(imageDelete, imageDone, imageEdit)
//         block.append(message, statusMessage, dateDom, buttons)
//         output.append(block)
//     })
// }
// const editFunc = (id) => {
//     todos = todos.map(el => {
//         if (id === el.id) {
//             el.message = prompt('redaktiryute')
//         }
//         return el
//     })
//     renderTodos()
//     console.log(todos)
// }

// const doneFunc = (id) => {
//     todos = todos.map(el => {
//         if (id === el.id) {
//             el.status = !el.status
//         }
//         return el
//     })
//     renderTodos()
//     console.log(todos)
// }

// const deleteFunc = (id) => {
//     todos = todos.filter(el => {
//         return id !== el.id
//     })
//     renderTodos()
//     console.log(todos)
// }

// const DeleteAll = document.querySelector('.dltAll')

// DeleteAll.addEventListener('click', () => {
//     deleteAllFunc()
// })

// const deleteAllFunc = () => {
//     if (todos != null) {
//         todos = []
//     }
//     renderTodos()
// }
