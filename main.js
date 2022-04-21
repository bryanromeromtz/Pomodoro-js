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
    }
});

// esta funcion crea una tarea nueva y la añade al array tasks
const createTask = (task) => {
    // creamos un objeto con la tarea y el estado inicial
    const newTask = {
        id: uuid.v4(),
        title: task,
        completed: false,
    };
    // añadimos el objeto a nuestro array
    tasks.unshift(newTask);
    console.log(tasks);
}

