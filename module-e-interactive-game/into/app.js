
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

let scores = 0

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

        // get now
        let nowLeft = parseInt(avatar.style.left.slice(0, -2))
        let nowTop = parseInt(avatar.style.top.slice(0, -2))
    
        if (e.key == 'ArrowRight') { 
            // TODO: RIGHT
            avatar.style.transform = 'rotateY(0)'
            
            if (scene1.style.display == 'flex') {
                if (nowLeft == 1060 && scores == 0) {
                    task_render(['Which is for styling?', 'HTML', 'CSS', 'JavaScript', 'PHP'],'CSS' )
                }
            } else if (scene2.style.display == 'flex') {
                if (nowLeft == 900 && scores == 25) {
                    task_render(['Which is in <head>?', 'meta', 'body', 'div', 'textarea'],'meta' )
                } else if (nowLeft == 1080 && scores == 50) {
                    task_render(['Which is for important content?', 'b', 'bold', 'strong', 'i'],'strong' )
                }
            } else if (scene3.style.display == 'flex') {
                if (nowLeft == 1060 && scores == 75) {
                    task_render(['Who is accessibility for?', 'Disabled people', 'Old people', 'Blind people', 'Every one'],'Every one' )
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
    //     avatar.style.left = `${e.layerX}px`
    //     avatar.style.top = `${400 + e.layerY}px`
    // })

    /* open barier */
    const bariers = document.querySelectorAll('.barier')

    for (let i = 0; i < bariers.length; i++) {
        console.log(i)
        bariers[i].addEventListener('click', () => {
            if (i == 0 && scores == 0) {
                task_render(['Which is for styling?', 'HTML', 'CSS', 'JavaScript', 'PHP'],'CSS' )
            } else if (i == 1 &&scores == 25) {
                task_render(['Which is in <head>?', 'meta', 'body', 'div', 'textarea'],'meta' )
            } else if (i == 2 &&scores == 50) {
                task_render(['Which is for important content?', 'b', 'bold', 'strong', 'i'],'strong' )
            } else if (i == 3 &&scores == 75) {
                task_render(['Who is accessibility for?', 'Disabled people', 'Old people', 'Blind people', 'Every one'],'Every one' )
            }
        })
    }
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

function task_render(massive, true_answer) {
    question.style.display = 'flex'
    question__title.innerHTML = massive[0]
    question__answers.innerHTML =   `
        <div class="answer1 answer">${massive[1]}</div>
        <div class="answer2 answer">${massive[2]}</div>
        <div class="answer3 answer">${massive[3]}</div>
        <div class="answer4 answer">${massive[4]}</div>
    `
    let answers = document.querySelectorAll('.answer')

    for (const answer of answers) {
        answer.addEventListener('click', () => {
            if (answer.innerHTML == true_answer) {
                question.style.display = 'none'
                scores += 25
            } else {
                console.log(`${ answer.innerHTML}`)
        }
    })
    }
}

const audio = document.querySelector('audio')
const images = document.querySelectorAll('img')

for (const image of images) {
    image.addEventListener('click', () => {
        audio.play()
    })
}