// full screen
const fullscreens = document.querySelectorAll('.fullscreen')

const question =document.querySelector('.question')
const close =document.querySelector('.close')

for (const fullscreen of fullscreens) {
   fullscreen.addEventListener('click', () => {
        if (document.documentElement.requestFullscreen()) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
   })
}

/* zone1  */
const barrier1 = document.querySelectorAll('.barrier')
const avatar = document.querySelector('.avatar')

/* get zones */
const zones = document.querySelectorAll('.zone')
const zone1= document.querySelector('.zone1')
const zone2 = document.querySelector('.zone2')
const zone3 = document.querySelector('.zone3')


/* keyboard */
document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
        num = parseInt(avatar.style.left.slice(0,-2)) + 10

        // if (zone1.style.display == 'flex') {
        //     let qustatus= 'close'
        //     console.log(qustatus)

        //     if (qustatus == 'close') {
        //         if (num > 1070) {
        //             question.style.display = 'flex'
        //             qustatus = 'open'
        //         }
        //     }
        // }

        if (num > 1240) {
            console.log(zone1.style.display)
            if (avatar.style.left != '100px') {
                if (zone1.style.display == 'flex') {
                    zone2.style.display = 'flex'
                    zone1.style.display = 'none'
                    zone3.style.display = 'none'
                    avatar.style.left = '100px'
                } else if (zone2.style.display == 'flex') {
                    zone2.style.display = 'none'
                    zone3.style.display = 'flex'
                    zone1.style.display = 'none'
                    avatar.style.left = '100px'
                }
            }
        } else {
            avatar.style.left = `${num}px`
        } 

    } else if (e.key == 'ArrowLeft') {
        num = parseInt(avatar.style.left.slice(0,-2)) - 10

        if (num < 20) {
            console.log(20)

            if (avatar.style.left != '100px') {
                if (zone3.style.display == 'flex') {
                    zone2.style.display = 'flex'
                    zone1.style.display = 'none'
                    zone3.style.display = 'none'
                    avatar.style.left = '100px'
                } else if (zone2.style.display == 'flex') {
                    zone2.style.display = 'none'
                    zone3.style.display = 'none'
                    zone1.style.display = 'flex'
                    avatar.style.left = '1180px'
                }
            }
        }  else {
            avatar.style.left = `${num}px`
        }
    } else if (e.key == 'ArrowUp') {
        num = parseInt(avatar.style.top.slice(0,-2)) - 10

        if (num < 400) {
            num  = parseInt(avatar.style.top.slice(0,-2))
        } 

        avatar.style.top = `${num}px`
    } else if (e.key == 'ArrowDown') {
        num = parseInt(avatar.style.top.slice(0,-2)) + 10

        if (num > 600) {
            num  = parseInt(avatar.style.top.slice(0,-2))
        } 

        avatar.style.top = `${num}px`
    }
})

/*  go to another location when you click on sign */
const nex1 = document.querySelector('#nex1')
const nex2 = document.querySelector('#nex2')

const prev1 = document.querySelector('#prev1')
const prev2 = document.querySelector('#prev2')

nex1.addEventListener('click', () => {
    zone2.style.display = 'flex'
    zone1.style.display = 'none'
})
nex2.addEventListener('click', () => {
    zone1.style.display = 'none'
    zone2.style.display = 'none'
    zone3.style.display = 'flex'
})
prev1.addEventListener('click', () => {
    zone2.style.display = 'none'
    zone1.style.display = 'flex'
})
prev2.addEventListener('click', () => {
    zone2.style.display = 'flex'
    zone3.style.display = 'none'
})  

close.addEventListener('click', () => {
    question.style.display = 'none'
})