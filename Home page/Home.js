const fadeElements = document.querySelectorAll('.page');


scrollAnim = function(){
	let windowHt = window.innerHeight;

	fadeElements.forEach(element => {
		let elementPos = element.getBoundingClientRect().top;
		if (elementPos <= windowHt / 1.3 ) {
			element.classList.add('done');
		}
	});
}

document.addEventListener("DOMContentLoaded", scrollAnim);

window.addEventListener('scroll', scrollAnim);


window.addEventListener("scroll", function(){
	var header = this.document.querySelector("header");
	header.classList.toggle("sticky", window.scrollY > 0);
})


const toggleButton = document.getElementsByClassName('toggle')[0];
const nav = document.getElementsByClassName('nav_bar')[0];
const heading = document.getElementsByClassName('heading')[0];

toggleButton.addEventListener('click', ()=>{
	nav.classList.toggle('active');
	heading.classList.toggle('active');
})


