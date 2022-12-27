// const output = document.querySelector('#output')


// const date = new Date()
// console.log('день: ',date.getDate());
// console.log(date.getMonth()+1)
// console.log(date.getFullYear());
// console.log(date.getHours());
// console.log(date.getMinutes());
// console.log(date.getSeconds());
// console.log(date.toISOString());

// const currentDate = `Date: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}
// :${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()}`
// console.log(currentDate);
// console.log(typeof date.getSeconds())
// output.textContent=currentDate


const form = document.querySelector('form')

let todos = []

const createTask = () => {
    const message = document.querySelector('input')
    const task = {
        id: new Date().toISOString(),
        message: message.value,
        status: false,
        date: new Date()
    }
    todos = [task,...todos]
    renderTodos()
}
const message = document.querySelector('input')
form.addEventListener('submit', e => {
    e.preventDefault()
    if (message.value === '') {
        alert('nedostato4no')
    } else {
        createTask()
        console.log(todos);
    }
})

const renderTodos = () => {
    const output = document.querySelector('#output')
    const input = document.querySelector('input')
    output.innerHTML = ''
    input.value = ''
    todos.forEach((el,index) => {
        const block = document.createElement('div')
        const buttons = document.createElement('div')
        const message = document.createElement('p')
        const statusMessage = document.createElement('p')
        const dateDom = document.createElement('p')

        const deleteTodo = document.createElement('button')
        const imageDelete = document.createElement('img')
        const imageDone = document.createElement('img')
        const imageEdit = document.createElement('img')
        const doneTodo = document.createElement('button')
        const editTodo = document.createElement('button')

        deleteTodo.textContent = 'DELETE'
        block.className = 'task'
        buttons.className = 'buttons'
        doneTodo.textContent = el.status
            ? 'NOT DONE'
            : 'DONE'
        editTodo.textContent = 'EDIT'

        message.textContent = `${index+1}.${el.message}`
        message.className = 'msgName'
        message.style.textDecoration = el.status===true
            ?'line-through'
            :''
        imageDelete.src = 'https://w7.pngwing.com/pngs/241/639/png-transparent-bin-icon-computer-icons-desktop-button-free-high-quality-remove-icon-miscellaneous-text-rectangle.png'
        imageDone.src = 'https://www.clipartmax.com/png/middle/301-3011314_pe-success-icon-task-done.png'
        imageEdit.src = 'https://toppng.com/uploads/preview/75476-2019-02-08-edit-icon-png-small-11563142463qiwrzqx0e1.png'
        imageDelete.className = 'imageDlt'
        imageDone.className = 'imageDn'
        imageEdit.className = 'imageEdt'
        statusMessage.textContent = el.status
            ? 'TODO IS DONE'
            : 'YOUR TODO IS NOT DONE'

        block.style.background = el.status
            // ? 'lightgreen'
            // : 'red'

        const date = el.date

        const currentDate = `Date: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`


        dateDom.textContent = currentDate


        imageDone.addEventListener('click', () => {
            doneFunc(el.id)
        })

        imageDelete.addEventListener('click', () => {
            if(el.status ===true){
                deleteFunc(el.id)
            }else{
                alert('not a done')
            }
            
        })

        imageEdit.addEventListener('click', () => {
           
            if(el.status===false){
                editFunc(el.id)
            }else{
                alert('its done')
            }
            
        })

        buttons.append(imageDelete, imageDone, imageEdit)
        block.append(message, statusMessage, dateDom, buttons)
        output.append(block)
    })
}
const editFunc = (id) => {
    todos = todos.map(el => {
        if (id === el.id) {
            el.message = prompt('redaktiryute')
        }
        return el
    })
    renderTodos()
    console.log(todos)
}

const doneFunc = (id) => {
    todos = todos.map(el => {
        if (id === el.id) {
            el.status = !el.status
        }
        return el
    })
    renderTodos()
    console.log(todos)
}

const deleteFunc = (id) => {
    todos = todos.filter(el => {
        return id !== el.id
    })
    renderTodos()
    console.log(todos)
}

const DeleteAll = document.querySelector('.dltAll')

DeleteAll.addEventListener('click',()=>{
    deleteAllFunc()
})

const deleteAllFunc = () =>{
    if(todos != null){
        todos = []
    }
    renderTodos()
}

// 1)Отрисовать дату по человечески
// 2)После добавления новой тудушки input очищается
// 3)input не должен принимать пустоту
// 4)Реализовать удаление тудушки
// 5)Удаление тудушки после Done(status:true)
// 6)Реализовать редактирование тудушки
// 7)редактирование не работает после Done(status:true)
// 8)Вместо кнопок поставить картинки-иконки
// 9)После Done(status:true) текст должен перечеркнутся
// 10)Созданная вами тудушка должна появится первой в списке
// 11)Пронумеровать ваши тудушки
// 12)Стилизовать
// 13)Залить в гитхаб