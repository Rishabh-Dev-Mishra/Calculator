let string = "";
let history = [];

let buttons = document.querySelectorAll('button');
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        var aud = new Audio("sound.mp3");
        aud.play();

        if (e.target.innerHTML == '=') {
            try {
                let result = eval(string);
                document.querySelector('input').value = result;
                history.push(`${string} = ${result}`);
                updateHistoryUI();
            } catch {
                document.querySelector('input').value = "Error";
            }
        } else if (e.target.innerHTML == 'AC') {
            string = "";
            document.querySelector('input').value = string;
        } else {
            string = string + e.target.innerHTML;
            document.querySelector('input').value = string;
        }
    });
});

document.addEventListener('keydown', function (event) {
    var aud = new Audio("sound.mp3");
    aud.play();
    event.preventDefault();
    perform(event.key);
});

function perform(key) {
    switch (key) {
        case 'Backspace':
            string = string.slice(0, -1);
            document.querySelector('input').value = string;
            break;
        case 'Escape':
            string = "";
            document.querySelector('input').value = string;
            break;
        case 'Enter':
            try {
                let result = eval(string);
                document.querySelector('input').value = result;
                history.push(`${string} = ${result}`);
                updateHistoryUI();
            } catch {
                document.querySelector('input').value = "Error";
            }
            break;
        case '*':
        case '/':
        case '-':
        case '+':
        case '.':
            string = string + key;
            document.querySelector('input').value = string;
            break;
        default:
            if (key >= '0' && key <= '9') {
                string = string + key;
                document.querySelector('input').value = string;
            }
            else {
                alert("Check the key pressed");
            }
    }
}

function updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((calculation) => {
        const li = document.createElement('li');
        li.textContent = calculation;
        historyList.appendChild(li);
    });
}
