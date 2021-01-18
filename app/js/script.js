import { Modal } from "./modules/modal.js";
import { fromURLtoHTML } from "./modules/toHTML.js";

const url = "https://books-f0680-default-rtdb.firebaseio.com/books.json";

const cards = document.getElementById("cards");

let productsList;
fromURLtoHTML(url, cards).then(products => {
	productsList = products;
});

cards.addEventListener("click", event => {
	const card = event.target.closest(".card");

	if (card) {
		const [product] = productsList.filter(item => item.id == card.dataset.id);
		const formatter = new Intl.NumberFormat("kk", {
			currency: "KZT",
		});

		const cardModal = new Modal(null, {
			title: product.name,
			width: 700,
			content: [
				{
					tag: "img",
					src: `./img/big/${product.id}.jpg`,
				},
				{
					tag: "span",
					text: `Цена: ${formatter.format(product.price)} &#8376;`,
				},
			],
			footer: [
				{
					tag: "button",
					class: "modal__btn",
					text: "Добавить в корзину",
				},
			],
		});
		cardModal.open();
	}
});

const registration = new Modal("#registration", {
	isBackdropClose: true,
	title: "Регистрация",
	content: [
		{
			tag: "input",
			type: "text",
			id: "name",
			name: "name",
			placeholder: "Имя",
		},
		{
			tag: "input",
			type: "email",
			id: "email",
			name: "email",
			pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
			placeholder: "Email",
		},
		{
			tag: "input",
			type: "password",
			id: "password",
			name: "password",
			placeholder: "Password",
		},
		{
			tag: "label",
			for: "modal-date",
			text: "День рождения:",
		},
		{
			tag: "input",
			type: "date",
			name: "date",
		},
	],
	footer: [
		{
			tag: "button",
			class: "modal__btn",
			text: "Регистрация",
			on: {
				event: "click",
				func: () => {
					registration.close();
				},
			},
		},
		{
			tag: "button",
			class: "modal__btn",
			text: "Уже зарегистрирован(а)",
			on: {
				event: "click",
				func: () => {
					registration.close();
					signIn.open();
				},
			},
		},
	],
});

const signIn = new Modal(".sign-in", {
	isBackdropClose: true,
	title: "Вход",
	content: [
		{
			tag: "input",
			type: "email",
			name: "email",
			pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
			placeholder: "Email",
		},
		{
			tag: "input",
			type: "password",
			name: "password",
			placeholder: "Password",
		},
		{
			tag: "p",
			text:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, voluptatibus.",
		},
	],
	footer: [
		{
			tag: "button",
			class: "modal__btn",
			text: "Sign In",
		},
	],
});
