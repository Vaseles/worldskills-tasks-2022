
// full screen
document.querySelectorAll('.fullscreen').forEach(f => {
    f.addEventListener('click', () => {
        if (document.documentElement.requestFullscreen()) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    })
})

// question 
const question = document.querySelector('.question')
const question__title = document.querySelector('.question__title')
const question__answers = document.querySelector('.question__answers')

// scenes
const scene1 = document.querySelector('.scene1')
const scene2 = document.querySelector('.scene2')
const scene3 = document.querySelector('.scene3')

// go to another location when you click on special signes
const next1 = document.querySelector('#next1')
const next2 = document.querySelector('#next2')

const prev1 = document.querySelector('#prev1')
const prev2 = document.querySelector('#prev2')

// next
next1.addEventListener('click', () => {
    hideScene(scene1); showScene(scene2)
})
next2.addEventListener('click', () => {
    hideScene(scene2); showScene(scene3)
})

// prev
prev1.addEventListener('click', () => {
    hideScene(scene2); showScene(scene1)
})
prev2.addEventListener('click', () => {
    hideScene(scene3); showScene(scene2)
})


// keyboard
document.addEventListener('DOMContentLoaded', () => {
    const avatar  = document.querySelector('.avatar')

    document.addEventListener('keydown', (e) => {
        console.log(e.key)

        // get now
        let nowLeft = parseInt(avatar.style.left.slice(0, -2))
        let nowTop = parseInt(avatar.style.top.slice(0, -2))
    
        if (e.key == 'ArrowRight') { 
            // TODO: RIGHT
            avatar.style.transform = 'rotateY(0)'
            
            if (scene1.style.display == 'flex') {
                if (nowLeft == 1080) {
                    question.style.display = 'flex'
                    question__title.innerHTML = 'Which is for styling?'
                    question__answers.innerHTML =   `
                        <div class="answer1 answer">HTML</div>
                        <div class="answer2 answer">CSS</div>
                        <div class="answer3 answer">JavaScript</div>
                        <div class="answer4 answer">PHP</div>
                    `
                    let answers = document.querySelectorAll('.answer')
                    console.log(answers)
    
                    for (const answer of answers) {
                       answer.addEventListener('click', () => {
                            console.log(answer.innerHTML)
                            if (answer.innerHTML == 'JavaScript') {
                                question.style.display = 'none'
                            } else {
                                answer.classList.add('wrong__answer')
                                
                                setTimeout(() => {
                                    answer.classList.remove('wrong__answer')
                                }, 300)
                            }
                       })
                    }
                }
            } else if (scene2.style.display == 'flex') {
                if (nowLeft == 920) {
                    question.style.display = 'flex'
                    question__title.innerHTML = 'Which is in <head>?'
                    question__answers.innerHTML =   `
                        <div class="answer1 answer">meta</div>
                        <div class="answer2 answer">bodty</div>
                        <div class="answer3 answer">div</div>
                        <div class="answer4 answer">textarea</div>
                    `
                    let answers = document.querySelectorAll('.answer')
                    console.log(answers)
    
                    for (const answer of answers) {
                       answer.addEventListener('click', () => {
                            console.log(answer.innerHTML)
                            if (answer.innerHTML == 'meta') {
                                question.style.display = 'none'
                            } else {
                                answer.classList.add('wrong__answer')
                                
                                setTimeout(() => {
                                    answer.classList.remove('wrong__answer')
                                }, 300)
                            }
                       })
                    }
                } else if (scene3.style.display == 'flex') {
                    if (nowLeft == 1080) {
                        question.style.display = 'flex'
                        question__title.innerHTML = 'Who is accessibility for?'
                        question__answers.innerHTML =   `
                            <div class="answer1 answer">Disabled people</div>
                            <div class="answer2 answer">Old people</div>
                            <div class="answer3 answer">Blind people</div>
                            <div class="answer4 answer">Every one</div>
                        `
                        let answers = document.querySelectorAll('.answer')
                        console.log(answers)
        
                        for (const answer of answers) {
                           answer.addEventListener('click', () => {
                                console.log(answer.innerHTML)
                                if (answer.innerHTML == 'Every one') {
                                    question.style.display = 'none'
                                } else {
                                    answer.style.animation = 'wrong .3s linear infinite'
                                    answer.style.opacity = '.7'
                                }
                           })
                        }
                    }
                }

                if (nowLeft == 1060) {
                    question.style.display = 'flex'
                    question__title.innerHTML = 'Which is for important content?'
                    question__answers.innerHTML =   `
                        <div class="answer1 answer">b</div>
                        <div class="answer2 answer">bold</div>
                        <div class="answer3 answer">strong</div>
                        <div class="answer4 answer">i</div>
                    `
                    let answers = document.querySelectorAll('.answer')
                    console.log(answers)
    
                    for (const answer of answers) {
                       answer.addEventListener('click', () => {
                            console.log(answer.innerHTML)
                            if (answer.innerHTML == 'strong') {
                                question.style.display = 'none'
                            } else {
                                answer.classList.add('wrong__answer')
                                
                                setTimeout(() => {
                                    answer.classList.remove('wrong__answer')
                                }, 300)
                            }
                       })
                    }
                }
            } 

            // SHOW | HIDE SCENE
            if (nowLeft > 1200) {
                avatar.style.left = nowLeft

                if (scene1.style.display == 'flex') {
                    scene2.style.display = 'flex'
                    scene1.style.display = 'none'
                    avatar.style.left = '100px'
                } else if (scene2.style.display == 'flex') {
                    scene3.style.display = 'flex'
                    scene2.style.display = 'none'

                    avatar.style.left = '100px'
                } 
            } else {
                avatar.style.left = `${nowLeft  + 10}px`
            }
        } else if ( e.key == 'ArrowLeft') {
            // TODO: LEFT
            avatar.style.transform = 'rotateY(-180deg)'

            // SHOW | HIDE SCENE
            if (nowLeft < 20) {
                avatar.style.left = nowLeft

                if (scene2.style.display == 'flex') {
                    scene1.style.display = 'flex'
                    scene2.style.display = 'none'

                    avatar.style.left = '1200px'
                } else if (scene3.style.display == 'flex') {
                    scene2.style.display = 'flex'
                    scene3.style.display = 'none'

                    avatar.style.left = '1200px'
                }
            } else {
                avatar.style.left = `${nowLeft  - 10}px`
            }
        } else if ( e.key == 'ArrowUp')  {    
            // TODO: UP
            if (nowTop > 400) {
                console.log(nowTop)
                avatar.style.top = `${nowTop  - 10}px`
            } else {
                avatar.style.top = nowTop
            }
        } else if ( e.key == 'ArrowDown')  {
            // TODO: DOWN
            if (nowTop < 605) {
                avatar.style.top = `${nowTop  + 10}px`
            } else {
                avatar.style.top = nowTop
            }
        }
    })

    // document.querySelector('.road').addEventListener('click', (e) => {
    //     console.log(e)
    
    //     avatar.style.left = `${e.layerX}px`
    //     avatar.style.top = `${400 + e.layerY}px`
    // })
})


// hide scene function
function hideScene(i) {
    i.style.display = 'none'
}

// show scene function
function showScene(i) {
    i.style.display = 'flex'
}

// close question
const close_button = document.querySelector('.close_button')


close_button.addEventListener('click', () => {
    question.style.display = 'none'
})

function choiceCorrectAnswer(correctAnswers) {
    const answers = document.querySelectorAll('.answer')
    
    for (const answer of answers) {
       answer.addEventListener('click', () => {
            if (answer.innerHTML == correctAnswers) {
                question.style.display = 'none'
            } else {
                answer.classList.add('wrong__answer')
                
                setTimeout(() => {
                    answer.classList.remove('wrong__answer')
                }, 300)
            }
       })
    }
}