const enterBtn = document.querySelector('.enter');
const output = document.querySelector('.output');
const numbers = document.querySelectorAll('.num');
const scoreNumberEle = document.querySelector('.score-number');
const clearBtn = document.querySelector('.clear');
const submitBtn = document.querySelector('.submit-btn');
const firstNumber = document.querySelector('.num-one');
const secondNumber = document.querySelector('.num-two');
const operator = document.querySelector('.operator');
let scoreNumber = 0, dataList = [];

const random = scoreNumber < 100 ? 10 : scoreNumber >= 100 && scoreNumber < 200 ? 20 : 30;
const randomOne = Math.floor(Math.random() * random) + 1
const randomTwo = Math.floor(Math.random() * random)
const randomOperator = Math.floor(Math.random() * 4)

const createRandomNumber = () => {
    const random = scoreNumber < 100 ? 10 : scoreNumber >= 100 && scoreNumber < 200 ? 20 : 30;
    const randomOne = Math.floor(Math.random() * random) + 1
    const randomTwo = Math.floor(Math.random() * random)
    const randomOperator = Math.floor(Math.random() * 4)
    assignRandomNumToElement(randomOne, randomTwo, randomOperator)
}

const assignRandomNumToElement = (randomOne, randomTwo, randomOperator) => {
    let result;
    firstNumber.innerHTML = randomOne;
    secondNumber.innerHTML = randomTwo;
    operator.innerHTML = randomOperator == 0 ? '+' : randomOperator == 1 ? '-' : randomOperator == 2 ? '*' : '/'
    if (operator.innerHTML === '/') {
        const multi = eval(`${firstNumber.innerHTML}*${secondNumber.innerHTML}`)
        secondNumber.innerHTML = firstNumber.innerHTML
        firstNumber.innerHTML = multi
        result = (eval(`${multi}${operator.innerHTML}${firstNumber.innerHTML}`));
    }
    else
        result = eval(`${firstNumber.innerHTML}${operator.innerHTML}${secondNumber.innerHTML}`)
}
assignRandomNumToElement(randomOne, randomTwo, randomOperator)

const addAnswerToOutputScreen = (e) => {
    let num = e.target.innerHTML
    output.innerHTML += num
}

const checkAnswer = () => {
    if (Number(output.innerHTML) === eval(`${firstNumber.innerHTML}${operator.innerHTML}${secondNumber.innerHTML}`)) {
        scoreNumber += 10;
        scoreNumberEle.innerHTML = scoreNumber;
        createRandomNumber()
        clearOutput()
        hideSubmitContainer()
    }
    else {
        appearSubmitContainer()
    }
}

const hideSubmitContainer = () => {
    document.querySelector('.submit-container').classList.add('hide')
    document.querySelector('.questions').classList.remove('hide')
}

const appearSubmitContainer = () => {
    document.querySelector('.submit-container').classList.remove('hide')
    document.querySelector('.questions').classList.add('hide')
}

const clearOutput = () => {
    output.innerHTML = ''
}

const createladerboardElement = (dataList) => {
    let i = 1;
    const playerInfoEle = document.querySelector('.player')
    playerInfoEle.innerHTML = ''
    dataList.forEach(data => {
        let div = document.createElement('div');
        div.className = 'player-info';
        div.innerHTML =
            `
        <p>${i++}</p>
        <p>${data.name}</p>
        <p>${data.score}</p>
        `
        playerInfoEle.append(div)
    })
}


const addData = () => {
    const inputName = document.querySelector('input');
    const dataObj = {
        id: (Date.now()) / 2,
        name: inputName.value,
        score: scoreNumber
    }
    setScoreInSortedPosition(dataObj)
    inputName.value = ''
    hideSubmitContainer()
    scoreNumberEle.innerHTML = 0;
    clearOutput()
    createRandomNumber()
}

const setScoreInSortedPosition = (dataObj) => {
    let index;
    for (let i = dataList.length - 1; i >= 0; i--)
        if (dataList[i].score > dataObj.score) {
            index = dataList.indexOf(dataList[i])
        }
    if (index != undefined) {
        dataList.splice(index, 0, dataObj)
        createladerboardElement(dataList)
        storeDataAtStorage(dataList)
    }

    else {
        dataList.push(dataObj)
        createladerboardElement(dataList)
        storeDataAtStorage(dataList)
    }
}

const storeDataAtStorage = (dataList) => {
    localStorage.setItem('dataList', JSON.stringify(dataList))
}

const getDataFromLocalStorage = () => {
    if (localStorage.getItem('dataList'))
        return JSON.parse(localStorage.getItem('dataList'))
    return [];
}


const displayData = (data) => {
    createladerboardElement(data)
}

const init = () => {
    dataList = getDataFromLocalStorage();
    displayData(dataList)
}
init()


enterBtn.addEventListener('click', checkAnswer)
numbers.forEach(num => {
    num.addEventListener('click', addAnswerToOutputScreen)
})
clearBtn.addEventListener('click', clearOutput)
submitBtn.addEventListener('click', addData)