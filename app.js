let elem = ["(", ")", "%", "AC", 7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ".", "=", "+"];
let complexelem = ["!", "ln", "log", "√", "**", "sin", "cos", "tan", "π", "e"]
const complex = [{
        icon: 'log',
        function: Math.log
    },
    {
        icon: 'ln',
        function: Math.LN2
    },
    {
        icon: 'sin',
        function: Math.sin
    },
    {
        icon: 'tan',
        function: Math.tan
    },
    {
        icon: '√',
        function: Math.sqrt
    },
    {
        icon: 'π',
        function: Math.PI
    },
    {
        icon: 'e',
        function: Math.e
    },
    {
        icon: 'cos',
        function: Math.cos
    }
]

//creates div and elements for complex operators
let y = 0;
let z = 0;

let complex__parent = document.createElement("div");
complex__parent.className = " hidden complex__parent ";
document.body.appendChild(complex__parent);

for (i = 0; i < 2; i++) {
    let hellodiv = document.createElement('div');
    hellodiv.className = 'btn--complex';
    document.querySelector('.complex__parent').appendChild(hellodiv);
    for (j = 0; j < 5; j++) {
        let element = complexelem[z];
        let btn = document.createElement('BUTTON');
        btn.className = 'btn btn__complex--buffer';
        btn.innerHTML = element;
        hellodiv.appendChild(btn);
        z++;
    }
}


// create main div for flex
let main = document.createElement("div")
main.className = "main__container"
document.body.appendChild(main);
// create parent div of input
let input__parent = document.createElement("div");
input__parent.className = "input__parent";
document.querySelector('.main__container').appendChild(input__parent);

// create button to display comlex math
let create_btn = document.createElement('button');
create_btn.className = 'expand';
create_btn.innerHTML = '+';
document.querySelector('.input__parent').appendChild(create_btn);

// create input
let create_input = document.createElement('input');
create_input.className = "input";
create_input.placeholder = 0;
document.querySelector('.input__parent').appendChild(create_input);

// create divs and btn for  num and operators
for (i = 0; i < 5; i++) {
    console.log('div');
    let div = document.createElement('div');
    div.className = 'parent';
    document.querySelector('.main__container').appendChild(div);
    for (j = 0; j < 4; j++) {
        let element = elem[y];
        let btn = document.createElement('BUTTON');
        btn.className = 'btn';
        btn.innerHTML = element;
        if (element == '=') {
            btn.id = 'blue';
        }
        div.appendChild(btn);
        y++;
    }
}

//main calculation function receives string checks for unwanted characters in begining due to bad complex function writing
function safeEval(str) {
    // console.log("hi", str.charAt(0))
    if (complexcheck &&( str.charAt(0) == '-' || str.charAt(0) == '+' || str.charAt(0) == '*' || str.charAt(0) == '/')) {
        str = str.replace(str.charAt(0), '')
    }
    // console.log('this is value from safe eval function ', str)
    return Function('return ' + str)()
}

//complex function gets string input, checks for string element replaces them by result of according math. equation then send everything to safeeval
function checkComplex(str) {
    let finalstr = '';
    let exitValue = 1;
    while (isNaN(str) && exitValue < 10) {
        // console.log('FIRST CONDITION');
        for (elem of complex) {
            if (str.includes(elem.icon)) {
                // console.log('searching for elem in string');
                let newStr = str;
                let res = '';
                newStr = str.replace(elem.icon, 'x')
                // console.log('this is str : ', newStr);
                for (i = 0; i < newStr.length; i++) {
                    // console.log('this is i : ', i);
                    let current = newStr.charAt(i);
                    if (current === 'x') {
                        // console.log('this is current letter : ', current);
                        // console.log('Contains a sin/cos/tan !');
                        i++
                        for (j = i; j < str.length; j++) {
                            let newCurrent = newStr.charAt(j);
                            // console.log('this is j : ', j);
                            // console.log('and its letter ', newStr.charAt(j));
                            if (!(isNaN(newCurrent))) {
                                // console.log('number!');
                                toString(newCurrent)
                                res = res + newCurrent
                                str = str.replace(newStr.charAt(j), '')
                                console.log(str);
                                console.log('current res : ', res);
                            } else {
                                j = str.length;
                                i = newStr.length;
                            }
                        }
                    }
                }
                str = str.replace(elem.icon, '')
                // console.log(res, 'out of loop');
                finalstr = finalstr + ('+' + '(' + elem.function(res) + ')')
                // console.log('this is str after replace ', finalstr);
            }
        }
        exitValue = exitValue + 1;
        // console.log('this is exit ', exitValue);
    }
    // if non complex b4
    // finalstr=str+finalstr;
    // console.log(finalstr);
    let result = safeEval(finalstr)
    return result
}
//disable terrible tool when calculating negatives bcs of poor coding 
let complexcheck = false;
//to reset input after = if new number but not if new operator
let buffer = false;
// main listener to input
document.body.addEventListener('click', function (event) {
    let target = event.target
    if (target.className.match(/btn/)) {
        let btn_value = target.innerHTML;
        let input = document.querySelector('input');
        // console.log(btn_value);
        if (btn_value == 'AC') {
            console.log('Cleared input!');
            input.value = '';
        } else if (btn_value == '=') {
            console.log('pressed equal');
            let result;
            let i = 1
            //if it includes complex then it loads them into complex function 
            for (elem of complex) {
                // console.log('this is i ', i);
                // console.log(complex.length);
                // console.log('entered loop');
                // console.log(input.value);
                if (input.value.includes(elem.icon)) {
                    // console.log('entered function');
                    result = checkComplex(input.value);
                    i = complexelem.length + 1;
                    complexcheck = !complexcheck
                } else if (i == complex.length) {
                    // console.log('i went the short way');
                    result = safeEval(input.value);
                }
                i++
            }
            input.value = result;
            buffer = !buffer;
            // console.log(buffer);
        } else {
            //check if buffer is true and new input is a number or a complex then it resets input (buffer only true if it has been switched after =) 
            if (buffer && (!isNaN(btn_value) || target.className.match(/btn__complex--buffer/))) {
                input.value = btn_value
                buffer = false;
            } else {
                //default input
                buffer = false;
                if (input.value.length <= 10) {
                    input.value = input.value + btn_value;
                }
            }
        }
    }

})
//show or hide complex operators
document.querySelector('.expand').addEventListener('click', function () {
    document.querySelector('.complex__parent').classList.toggle('hidden');
})