// Please excuse my shit code, I made this at 1am.
const firstMessagePath = 'body > div.chatbox3 > div > div > div.logwrapper > div.logbox > div > div:nth-child(2) > p > span'
const secondMessagePath = 'body > div.chatbox3 > div > div > div.logwrapper > div.logbox > div > div:nth-child(3) > p > span'
const introPath = 'body > div.chatbox3 > div > div > div.logwrapper > div.logbox > div > div:nth-child(1) > p'

const iTextStart = 'You\'re now chatting with a random stranger.'

const enableIntro = true
const intros = [
  'hey!',
  'heyyy',
  'hiii',
  'Hey!',
  'Heyyyyyy',
  'Heyyy!',
  'yo',
  'oy',
  'heyo',
  'heyo!'
]

const g = (path) => document.querySelector(path)
const c = (msg) => /(^(h(ey|i) )?(([MF]( ?\d+)?)|(m or f)|(f or m))\??)|(k\.?i\.?k)|snap/i.test(msg)
const r = (array) => array[Math.floor(Math.random() * array.length)]

const didMorf = () => (
  (g(firstMessagePath) && c(g(firstMessagePath).innerText))
  || (g(secondMessagePath) && c(g(secondMessagePath).innerText))
)
const didDisconnect = () => !!g('.newchatbtnwrapper')
const didStart = () => g(introPath) && g(introPath).innerText.startsWith(iTextStart)

let timeout = null
setInterval(() => {
  if (didMorf() && !didDisconnect()) {
    g('.disconnectbtn').click()
    g('.disconnectbtn').click()
    g('.disconnectbtn').click()

    clearTimeout(timeout)
    timeout = null
  } else if (!g(firstMessagePath) && didStart() && enableIntro) {
    g('.chatmsg').value = r(intros)
    g('.sendbtn').click()
  } else if (didDisconnect()) {
    g('.disconnectbtn').click()

    clearTimeout(timeout)
    timeout = null
  } else if (didStart() && !timeout) {
    timeout = setTimeout(() => {
      if (!g(enableIntro ? secondMessagePath : firstMessagePath)) {
        g('.disconnectbtn').click()
        g('.disconnectbtn').click()
        g('.disconnectbtn').click()

        clearTimeout(timeout)
        timeout = null
      }
    }, 5500)
  }
}, 200)