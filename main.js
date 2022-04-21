// variables globales de la aplicación
const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

// referencias a los elementos del DOM
const addTask = document.getElementById('addTask');
const itTask = document.getElementById('itTask');
const form = document.getElementById('form');


// eventos del DOM
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // guardar el valor del input en la variable task
    const task = itTask.value;
    // validar que el valor no este vacio
    if (task) {
        // llaamamos a la función createTask y le pasamos el valor del input
        createTask(task);
        // vaciar el input
        itTask.value = '';

        // una vez que se crea la nueva tarea actualizamos el DOM o lo renderizamos
        renderTask();
    }
});

// esta funcion crea una tarea nueva y la añade al array tasks
const createTask = (task) => {
    // creamos un objeto con la tarea y el estado inicial
    const newTask = {
        _id: uuid.v4(),
        title: task,
        completed: false,
    };
    // añadimos el objeto a nuestro array
    tasks.unshift(newTask);
    console.log(tasks);
}

const renderTask = () => {

    const html = tasks.map((task) => {
        return `
            <div class="task">
                <div class="completed">
                    ${!task.completed ? `<button class="start-btn" data-id="${task._id}">Start</button>` : `<span class="done">Done</span>`}
                </div>
                <div class="title">${task.title}</div>
            </div>
        `;
    }).join('');
    console.log(html);
    document.getElementById('tasks').innerHTML = html;
}

