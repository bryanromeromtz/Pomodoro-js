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
const taskName = document.querySelector('#time #taskName');



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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'fill the field!'
        })
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
    // console.log(tasks);
}

// esta funcion mapea cada tarea en el array tasks y la pinta en el DOM
const renderTask = () => {

    const html = tasks.map((task) => {
        return `
            <div class="task">
                <div class="completed row">
                    ${!task.completed ? `<button class="start-btn btn fw-bold" data-id="${task._id}">Start</button>` : `<span class="done">Done</span>`}
                </div>
                <div class="title fs-5 mt-3 mb-3">${task.title}</div>
            </div>
        `;
        // con join podemos unir todos los elementos del array en un string
    }).join('');
    // console.log(html);
    document.getElementById('tasks').innerHTML = html;

    // acceder a los botones que se estan generando dinamicamente
    const startBtns = document.querySelectorAll('.task .start-btn');

    // recorremos el array de botones
    startBtns.forEach((btn) => {
        // añadimos un evento click a cada boton
        btn.addEventListener('click', (event) => {
            // console.log(event.target.dataset.id);
            // buscamos la tarea que corresponde al id del boton
            // const task = tasks.find((task) => task._id === event.target.dataset.id);
            // console.log(task);
            // cambiamos el estado de la tarea
            // task.completed = !task.completed;
            // console.log(task);
            // actualizamos el DOM
            // renderTask();

            // si no existe una timer
            if (!timer) {
                // buscamos la tarea que corresponde al id del boton
                let id = btn.getAttribute('data-id');
                // llaamamos a la función  y le pasamos el id de la tarea
                startBtnHandler(id);
                console.log(id);
                btn.textContent = 'In Progress...';
            }
        });
    });
}

// esta funcion crea un timer y lo ejecuta
const startBtnHandler = (id) => {
    time = 25 * 60;
    // se le asigna el id a current
    current = id;
    // taskIndex encuentra el index de la tarea y retorna el indice
    const taskIndex = tasks.findIndex((task) => task._id === id);
    // se inyecta el titulo de la tarea en el dom
    taskName.textContent = tasks[taskIndex].title;

    // creamos el timer
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
}


// esta funcion comienza el timer 
const timeHandler = (id) => {
    // comienza a contar el timer y lo decrementa cada segundo
    time--;
    renderTime();

    // si el timer llega a 0 se detiene
    if (time === 0) {
        // se detiene el timer
        clearInterval(timer);
        // se limpia el timer
        timer = null;
        // se limpia el current
        current = null;
        // se limpia el taskName
        taskName.textContent = '';
        // se llama a la funcion break
        renderTime();
    }
}


// esta funcion renderiza el tiempo le da formato a un numero
const renderTime = () => {
    const timeDiv = document.querySelector('#time #value');
    // se divide el numero por la cantidad de segundos que tiene un minuto
    const minutes = parseInt(time / 60);
    // const seconds = parseInt(time - minutes * 60);
    const seconds = parseInt(time % 60);
    // console.log(minutes, seconds);
    timeDiv.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    console.log(timeDiv);
}






