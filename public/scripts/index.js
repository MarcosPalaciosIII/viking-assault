let game;
window.addEventListener("load", () => {
	console.log("Scripts Loaded!!");

	document.querySelector("#start-game").addEventListener("click", () => {
		game = new Game();
		game.start();
	});

	document.getElementById("attack-button").addEventListener("click", () => {
		game.attack();
	});

	document
		.getElementById("buy-soldier-button")
		.addEventListener("click", () => {
			game.buySoldier(false);
		});

	document.getElementById("buy-hero-button").addEventListener("click", () => {
		game.buySoldier(true);
	});
});
