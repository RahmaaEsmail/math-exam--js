const firstNumber = document.querySelector('.num-one');
const secondNumber = document.querySelector('.num-two');
const operator = document.querySelector('.operator');
const enterBtn = document.querySelector('.enter');
const output = document.querySelector('.output');
const numbers = document.querySelectorAll('.num');
const scoreNumberEle = document.querySelector('.score-number');
const clearBtn = document.querySelector('.clear');
const submitBtn = document.querySelector('.submit-btn');
const inputName = document.querySelector('input');
let scoreNumber = 0, dataList = [] , id = 0;

// const init = () => {
//     createRandomNumber()
//     clearOutput()
//     hideSubmitContainer()
// }

const createRandomNumber = ()=> {
    const random = scoreNumber < 100 ? 10 : scoreNumber >= 100 && scoreNumber<200 ? 20 : 30;
    const randomOne  = Math.floor(Math.random() * random)
    const randomTwo = Math.floor(Math.random() * random)
    const randomOperator = Math.floor(Math.random() * 4)
    assignRandomToElement(randomOne,randomTwo,randomOperator)
}

const assignRandomToElement = (randomOne, randomTwo, randomOperator)=> {
    let result ;
    firstNumber.innerHTML = randomOne;
    secondNumber.innerHTML = randomTwo;
    operator.innerHTML = randomOperator == 0 ? '+' : randomOperator == 1 ? '-' : randomOperator == 2 ? '*' : '/'
    if(operator.innerHTML === '/') {
        const multi = eval(`${firstNumber.innerHTML}*${secondNumber.innerHTML}`)
        secondNumber.innerHTML = firstNumber.innerHTML
        firstNumber.innerHTML = multi 
        result =(eval(`${multi}${operator.innerHTML}${firstNumber.innerHTML}`));
    }
    else
      result = eval(`${firstNumber.innerHTML}${operator.innerHTML}${secondNumber.innerHTML}`)
}

const addAnswerToOutputScreen = (e)=> {
    let num = e.target.innerHTML
    output.innerHTML += num
}

const checkAnswer = ()=> {
    if (Number(output.innerHTML) === eval(`${firstNumber.innerHTML}${operator.innerHTML}${secondNumber.innerHTML}`)) {
        scoreNumber += 10;
        scoreNumberEle.innerHTML = scoreNumber;
        createRandomNumber()
        clearOutput()
        hideSubmitContainer()
    }
    else
      appearSubmitContainer()
}

const hideSubmitContainer = ()=> {
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
    console.log(dataList);
    const div = document.createElement('div');
    div.className = 'player-info';
    div.innerHTML =
        `
                <p>${dataList.id}</p>
                <p>${dataList.name}</p>
                <p>${dataList.score}</p>
             `
    document.querySelector('.player').append(div)
}



const addData = ()=> {  
    id++;
    const dataObj = {
        id: id,
        name: inputName.value,
        score: scoreNumber
    }
    dataList.push(dataObj)

    // createladerboardElement(dataObj)
    storeDataAtStorage(dataList)
    sortScore(dataList)
}


const sortScore = (dataList) => {
    dataList.sort((a, b) => a.score - b.score)
    createladerboardElement(dataList)
}

const storeDataAtStorage = (dataList)=> {
    localStorage.setItem('dataList',JSON.stringify(dataList))
}

const getDataFromLocalStorage =()=> {
  if(localStorage.getItem('dataList')) 
     return JSON.parse(localStorage.getItem('dataList'))
  return [] ;
}


const displayData = (data)=> {
    data.sort((a,b) => a.score - b.score)
    data.forEach(ele => {
        createladerboardElement(ele)
    })    
}

const init = () => {
    dataList = getDataFromLocalStorage();
    displayData(dataList)
}
init()


enterBtn.addEventListener('click',checkAnswer)
numbers.forEach(num =>{
    num.addEventListener('click', addAnswerToOutputScreen)
})
clearBtn.addEventListener('click',clearOutput)
submitBtn.addEventListener('click',()=>{
    addData()
})

// function sortedArray(array,num) {
//   let i ;
//   for(i = array.length -1;i>=0 && array[i] > num ;i--) {
//     array[i+1] = array[i]
//   }
//   array[i+1] = num
// } 
// let sort =  [1,3,5,7,9]
// sortedArray(sort,4)
// console.log(sort);