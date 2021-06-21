const hi = [
    'https://tenor.com/view/hey-tomhanks-gif-5114770',
    'https://tenor.com/view/baby-yoda-baby-yoda-wave-baby-yoda-waving-hi-hello-gif-15975082',
    'https://tenor.com/view/bad-teeth-hi-hello-wave-gif-14630063',
    'https://tenor.com/view/puppy-dog-wave-hello-hi-gif-13974826',
    'https://tenor.com/view/cat-cute-animals-hello-there-gif-11875188',
    'https://tenor.com/view/hello-sexy-hi-hello-mr-bean-gif-13830351',
    'https://tenor.com/view/husky-hi-tinder-match-gif-14672196',
    'https://tenor.com/view/jack-black-sexy-hello-hola-looking-good-gif-15373614',
    'https://tenor.com/view/jimcarrey-tape-weird-funny-hi-gif-4505215',
    'https://tenor.com/view/hi-lilo-stitch-hello-gif-3566277'
]

const bye = [
    'https://tenor.com/view/hooray-its-weekend-ok-bye-ciao-slide-gif-15739082',
    'https://tenor.com/view/over-it-viola-davis-girl-bye-gif-9072347',
    'https://tenor.com/view/chris-tucker-friday-bye-felicia-gif-9020686',
    'https://tenor.com/view/bye-please-gif-13418631',
    'https://tenor.com/view/honey-boo-boo-bye-good-bye-girl-bye-aint-nobody-got-time-for-that-gif-3554967',
    'https://tenor.com/view/bye-donald-trump-gif-5648885',
    'https://tenor.com/view/peace-out-im-out-bye-gif-14304356',
    'https://tenor.com/view/goodbye-harrypotter-danielradcliffe-waving-train-gif-5021009',
    'https://tenor.com/view/bye-goodbye-snowwhite-gif-4588849',
    'https://tenor.com/view/goodbye-homer-gif-10101012'
]

const randomHi = () => hi[Math.floor(Math.random()*hi.length)]
const randomBye = () => bye[Math.floor(Math.random()*bye.length)]

module.exports = {randomHi, randomBye}