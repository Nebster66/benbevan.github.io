// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const track = document.querySelector(".carousel-track");
	const prevBtn = document.querySelector(".carousel-btn.prev");
	const nextBtn = document.querySelector(".carousel-btn.next");
	const slides = Array.from(track.children);
	let index = 0;

	function updateCarousel() {
		const width = slides[0].getBoundingClientRect().width;
		track.style.transform = `translateX(-${index * width}px)`;
	}

	nextBtn.addEventListener("click", () => {
		index = (index + 1) % slides.length;
		updateCarousel();
	});

	prevBtn.addEventListener("click", () => {
		index = (index - 1 + slides.length) % slides.length;
		updateCarousel();
	});

	window.addEventListener("resize", updateCarousel);
});
