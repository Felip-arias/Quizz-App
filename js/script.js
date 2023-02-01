//selección de todos los elementos necesarios
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Sí se pulsa el botón Start
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostrar cuadro de información
}

// Sí se pulsa el botón Salir
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ocultar cuadro de información
}

// Sí se pulsa el botón continuar
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ocultar cuadro de información
    quiz_box.classList.add("activeQuiz"); //mostrar cuadro de preguntas
    showQuetions(0); //llamada a la función showQestions
    queCounter(1); //pasando 1 parámetro a queCounter 
    startTimer(15); //llamado a la función startTimer
    startTimerLine(0); //llamado a la función startTimerLine
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Si se pulsa el botón restart Quiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //mostrar cuadro de preguntas
    result_box.classList.remove("activeResult"); //ocultar cuadro de resultados
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //llamada de la función showQestions
    queCounter(que_numb); //pasar valor que_numb a queCounter
    clearInterval(counter); //borrar contador
    clearInterval(counterLine); //limpiar counterLine
    startTimer(timeValue); //llamada a la función startTimer
    startTimerLine(widthValue); //llamada a la función startTimerLine
    timeText.textContent = "Tiempo"; //cambiar el texto de timeText a Tiempo restante
    next_btn.classList.remove("show"); //ocultar el botón siguiente
}

// Si se pulsa el botón quitQuiz
quit_quiz.onclick = ()=>{
    window.location.reload(); //recargar la ventana actual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// si se pulsa el botón Siguiente 
next_btn.onclick = ()=>{
    if(que_count < preguntas.length - 1){ //si el número de preguntas es inferior a la longitud total de la pregunta
        que_count++; //incrementar el valor de que_count
        que_numb++; //incrementar el valor que_numb
        showQuetions(que_count); //llamada a la función showQestions
        queCounter(que_numb); //pasar valor que_numb a queCounter
        clearInterval(counter); //limpiar contador
        clearInterval(counterLine); //borrar contralínea
        startTimer(timeValue); //llamada a la función startTimer
        startTimerLine(widthValue); //llamada a la función startTimerLine
        timeText.textContent = "Tiempo"; //cambiar el timeText a Tiempo restante
        next_btn.classList.remove("show"); //ocultar el botón siguiente
    }else{
        clearInterval(counter); //borrar contador
        clearInterval(counterLine); //borrar contralínea
        showResult(); //llamada a la función showResult
    }
}

// obtener preguntas y opciones del array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //crear una nueva etiqueta span y div para la pregunta y la opción y pasar el valor usando el índice del array
    let que_tag = '<span>'+ preguntas[index].numb + ". " + preguntas[index].preguntas +'</span>';
    let option_tag = '<div class="option"><span>'+ preguntas[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ preguntas[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ preguntas[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ preguntas[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //añadir nueva etiqueta span dentro de que_tag
    option_list.innerHTML = option_tag; //añadir nueva etiqueta div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // establecer el atributo onclick a todas las opciones disponibles
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// crear las nuevas etiquetas div que para los iconos
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Si el usuario hace clic en la opción
function optionSelected(answer){
    clearInterval(counter); //borrar contador 
    clearInterval(counterLine); 
    let userAns = answer.textContent; //Obtener la opción seleccionada por el usuario
    let correcAns = preguntas[que_count].answer; //obtener la respuesta correcta de la matriz
    const allOptions = option_list.children.length; //obtener todas las opciones
    
    if(userAns == correcAns){ //si la opción seleccionada por el usuario es igual a la respuesta correcta de la matriz
        userScore += 1; //aumentar el valor de la puntuación con 1
        answer.classList.add("correct"); //añadir color verde para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //añadir icono de marca de verificación para corregir la opción seleccionada
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //añadir color rojo para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //añadir icono en forma de cruz para corregir la opción seleccionada
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //si hay una opción que coincide con una respuesta de matriz
                option_list.children[i].setAttribute("class", "option correct"); //añadir color verde a la opción emparejada
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //añadir icono de marca a la opción seleccionada
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //una vez que el usuario selecciona una opción, entonces deshabilita todas las opciones
    }
    next_btn.classList.add("show"); //mostrar el botón siguiente si el usuario ha seleccionado alguna opción
}

function showResult(){
    info_box.classList.remove("activeInfo"); //ocultar cuadro de información
    quiz_box.classList.remove("activeQuiz"); //ocultar cuestionario
    result_box.classList.add("activeResult");//mostrar cuadro de resultados
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // si el usuario obtuvo más de 3 puntos
        //crear una nueva etiqueta span y pasar el número de puntuación del usuario y el número total de preguntas
        let scoreTag = '<span>Felicitaciones!🎉, tienes <p>'+ userScore +'</p> de <p>'+ preguntas.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //añadir nueva etiqueta span dentro de score_Text
    }
    else if(userScore > 1){ // si el usuario ha puntuado más de 1
        let scoreTag = '<span>Muy bien 😎, tienes <p>'+ userScore +'</p> de <p>'+ preguntas.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // si la puntuación del usuario es inferior a 1
        let scoreTag = '<span>Lo siento 😐, tienes <p>'+ userScore +'</p> de <p>'+ preguntas.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //cambiar el valor de timeCount con el valor del tiempo
        time--; //disminuye el valor del tiempo
        if(time < 9){ //si el temporizador es inferior a 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //añade un 0 antes del valor de tiempo
        }
        if(time < 0){ //si el temporizador es menor que 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Tiempo"; //cambiar el texto de tiempo a tiempo restante
            const allOptions = option_list.children.length; //obtener todas las opciones
            let correcAns = preguntas[que_count].answer; //obtener la respuesta correcta de la matriz
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //si hay una opción que coincide con una respuesta de matriz
                    option_list.children[i].setAttribute("class", "answer correct"); //añadir color verde a la opción emparejada
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //añadir icono de marca a la opción seleccionada
                    console.log("Tiempo: respuesta correcta seleccionada automáticamente.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("desactivado"); //una vez que el usuario selecciona una opción, entonces deshabilita todas las opciones
            }
            next_btn.classList.add("show"); //mostrar el botón siguiente si el usuario ha seleccionado alguno
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //actualizar el valor del tiempo con 1
        time_line.style.width = time + "px"; //incremento de la anchura de time_line con px por valor de tiempo
        if(time > 549){ //si el valor del tiempo es superior a 549
            clearInterval(counterLine); //borrar contralínea
        }
    }
}

function queCounter(index){
    //crear una nueva etiqueta span y pasar el número de pregunta y la pregunta total
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ preguntas.length +'</p> preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //añadiendo una nueva etiqueta span
}