const carouselData = [
	{
		header: "Weekly Events",
		synopsis: "Weekly sessions for <b>Magic: the Gathering</b> and <b>Dungeons & Dragons</b>!",
		description: "Here at Hobby Oasis, we host weekly sessions for <b>Magic: the Gathering</b> and <b>Dungeons & Dragons</b>.  Check the calendar for more info!"
	},
	{
		header: "New Magic: the Gathering Set",
		synopsis: "Buy decks and boosters for the new Scooby Doo crossover here",
		description: "The new Scooby Doo crossover set is out for <b>Magic: the Gathering</b>, and we have it here for you."
	},
	{
		header: "Coming Soon: Curated D&D",
		synopsis: "Persistent campaigns with the same DM and party the whole way!",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ex metus, tempus ut ipsum sed, posuere mollis ipsum. Quisque dictum feugiat nisl, at tempor mi."
	}
];
const carouselElement = document.getElementById("carousel");
const carouselButtonLeft = document.getElementById("carousel-left");
const carouselButtonRight = document.getElementById("carousel-right");

let activeItem = 0;
let carouselTimer;

function populateCarousel() {
	let tmpElement;

	carouselData.forEach((carouselItem, carouselIndex) => {
		let subElement;

		tmpElement = document.createElement("div");
		tmpElement.className = "carousel-item";

		subElement = document.createElement("div");
		subElement.innerHTML = "<h3>" + carouselItem.header + "</h3>";
		tmpElement.appendChild(subElement);

		subElement = document.createElement("div");
		subElement.innerHTML = "<p>" + carouselItem.synopsis + "<p>";
		tmpElement.appendChild(subElement);

		carouselElement.appendChild(tmpElement);
	});


	moveCarousel(0);
	document.getElementById("news").className += " show";
	document.getElementById("schedule").className += " show"; // Janky hack mate!
	carouselTimer = setInterval(moveCarousel, 5000, 1, true);
}

function stopTimer() {
	if (carouselTimer) {
		clearInterval(carouselTimer);
		carouselTimer = undefined;
	}
}

function moveCarousel(value, autoScroll) {
	activeItem = Math.max(activeItem += value, 0);

	if (activeItem >= carouselData.length) {
		activeItem = autoScroll ? 0 : carouselData.length - 1;
	}

	const carouselItems = carouselElement.getElementsByClassName("carousel-item");

	carouselItems.item(0).style.marginLeft = `calc(min(25%, 50% - min(300px, 45vw)) - ${activeItem} * min(600px, 90vw))`;

	for (let i = 0; i < carouselItems.length; i++) {
		carouselItems.item(i).className = i === activeItem ? "carousel-item active" : "carousel-item";
	}
	carouselButtonLeft.className = activeItem > 0 ? "hide show" : "hide";
	carouselButtonRight.className = activeItem < carouselData.length-1 ? "hide show" : "hide";

	if (!autoScroll) {
		stopTimer();
	}
}

setTimeout(populateCarousel, 500);
carouselButtonLeft.addEventListener("click", () => { moveCarousel(-1)});
carouselButtonRight.addEventListener("click", () => { moveCarousel(1)});