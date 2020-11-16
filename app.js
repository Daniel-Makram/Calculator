let elem = ["(", ")", "%", "AC", 7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ".", "=", "+"];
let y = 0;
for (i = 0; i < 5; i++) {
    console.log('div');
    let div = document.createElement('div');
    div.className = 'parent';
    document.body.appendChild(div);
    for (j = 0; j < 4; j++) {
        let element = elem[y];
        let btn = document.createElement('BUTTON');
        btn.className = 'btn';
        btn.innerHTML = element;
        if(element=='='){
            console.log('blue');
            btn.style.backgroundColor="rgb(66,133,244)";
        }
        div.appendChild(btn);
        y++;
    }
}

function safeEval(str){
    return Function('return '+str)()
}
// let current = 0;
document.body.addEventListener('click', function (event) {
    let targ = event.target

    if (targ.className.match(/btn/)) {
        let btn_value = targ.innerHTML;
        let input = document.querySelector('input');
        console.log(btn_value);
        if (btn_value == 'AC') {
            console.log('Cleared input!');
            input.value = '';
        } else if (btn_value == '=') {
            console.log('pressed equal');
            let result = safeEval(input.value);
            input.value = result;
        }
        // else if(btn_value=='+'){
        //     console.log('plus');
        //     current=input.value;
        //     console.log('current',current);
        //     input.value='';
        // }
        else {
            input.value = input.value + btn_value;
        }
    }

})