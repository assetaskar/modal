export function fromURLtoHTML(url, where) {
	return fetch(url)
		.then(response => response.json())
		.then(products => {
			let cards = products.map(product => {
				return `
            <div class="card" data-id="${product.id}">
				<div class="card__image"><img src="./img/small/${product.id}.jpg" alt="${product.name}"></div>
				<h2 class="card__name">${product.name}</h2>
            </div>
            `;
			});
			where.innerHTML = cards.join("");
			return products;
		});
}
