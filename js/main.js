function scrollFunction() {
	  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {

	    var element = document.getElementById("navbar");
   		element.classList.add("scroll");
	  } else {
	  	var element = document.getElementById("navbar");
   		element.classList.remove("scroll");
	  }
	}

document.addEventListener('scroll', scrollFunction)

// TYPE WRITER PART

class TypeWriter {
	constructor(txtElement,words,wait = 3000) {
		this.txtElement = txtElement
		this.words = words
		this.wordIndex = 0
		this.txt = ''
		this.wait = parseInt(wait,10)
		this.type()
		this.isDeleting = false
	}

	type() {
		// current number of word
		const current = this.wordIndex % this.words.length
		const fullTxt = this.words[current]

		if(this.isDeleting) {
			this.txt = fullTxt.substring(0,this.txt.length - 1)
		} else {
			this.txt = fullTxt.substring(0,this.txt.length + 1)
		}

		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

		let typeSpeed = 200
		if(this.isDeleting) {
			typeSpeed /= 2
		}

		if(!this.isDeleting && this.txt == fullTxt) {
			typeSpeed = this.wait
			this.isDeleting = true
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false
			this.wordIndex++
			typeSpeed = 500
		}

		setTimeout(() => this.type(), typeSpeed)

	}
}

// Init APP
function init(){
	const txtElement = document.querySelector('.text-type')
	const words = JSON.parse(txtElement.getAttribute('data-type'))
	const wait = txtElement.getAttribute('data-period');

	new TypeWriter(txtElement,words,wait)
}

document.addEventListener('DOMContentLoaded', init);


const tabs = document.querySelectorAll(".tab")
const tabContent = document.querySelectorAll('.tab-content')

const changeTab = (e) => {
	removeActiveTab()
	removeShow()
	e.target.classList.add('active-tab')
	const id = e.target.id
	const content = document.getElementById(`${id}-content`)
	content.classList.add('show')
}

const removeActiveTab = () => {
	tabs.forEach((tab) => tab.classList.remove('active-tab'))
}

const removeShow = () => {
	tabContent.forEach((item) => item.classList.remove('show'))
}

tabs.forEach((tab => tab.addEventListener('click', changeTab)))


const numberWithCommas = n => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const counterUpdateFunc = () => {
	let windowPos = window.scrollY
	let counterPos = document.querySelector('.section-counter').offsetTop
	let scrollTrigger = counterPos - window.innerHeight + 200
	const frameDuration = 1000 / 60
	if(windowPos >= scrollTrigger) {
		const counters = document.querySelectorAll('.countup')
    const speed = 551
		counters.forEach((counter) => {
			const updateCount = () => {
				const target = +counter.getAttribute('data-target')
				const count = +counter.innerText
				const inc = target / speed

				if(count < target) {
					counter.innerText = Math.ceil(count + inc)
					setTimeout(100)
				} else {
					counter.innerText = numberWithCommas(target)
				}
			}

			setInterval(() => {
				updateCount()
			},frameDuration)

			updateCount()
		})
	}
}

window.addEventListener('scroll',counterUpdateFunc)
counterUpdateFunc()
