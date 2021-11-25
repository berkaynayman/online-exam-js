let response

let connect = new XMLHttpRequest();
connect.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        response = JSON.parse(connect.responseText)
        getQuestion()
    }
    return response;
};
connect.open("GET", "data.json", true);
connect.send();

const RESPONSE_SECTION = document.querySelector('#question-section')
const QUESTION         = document.querySelector('#ques')
const RESPONSES        = document.getElementsByName("response")

const DESC_A = document.querySelector('#descA')
const DESC_B = document.querySelector('#descB')
const DESC_C = document.querySelector('#descC')
const DESC_D = document.querySelector('#descD')

const SUB_BTN = document.querySelector('#sub')

let point = 0
let turn  = 0

function getQuestion(){
    selectedClear()
    console.log(response);

    let turnQuestion   = response.questions[turn];

    QUESTION.innerHTML = turnQuestion.ques;
    DESC_A.inneHTML    = turnQuestion.resA;
    DESC_B.inneHTML    = turnQuestion.resB;
    DESC_C.inneHTML    = turnQuestion.resC;
    DESC_D.inneHTML    = turnQuestion.resD;

}

function selectedClear(){
    RESPONSES.forEach( item => item.checked = false);
}

function selectedGetAnswer(){
    let selectedAnswer
    RESPONSES.forEach( item => {
        if(item.checked == true){
            selectedAnswer = item.id
        }
    })
    return selectedAnswer
}

SUB_BTN.addEventListener("click", () =>{
    const selected = selectedGetAnswer();
    
    if (selected) {
        if(selected === response.questions[turn]["trueres"]){
            point++
        }
    }
    console.log("point ", point);
    turn++

    if(turn < response.questions.length){
        getQuestion()
    }else{
        RESPONSE_SECTION.innerHTML = `
            <h2 class="point">POINT : ${point}</h2> `
        SUB_BTN.setAttribute("onClick", "location.reload()");
        SUB_BTN.innerHTML = "TRY AGAIN"
    }

})