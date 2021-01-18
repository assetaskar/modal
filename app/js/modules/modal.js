export class Modal {
	constructor(selector, props) {
		this.props = props;

		if (selector)
			document.querySelector(selector).addEventListener("click", this.open.bind(this));
	}

	_create() {
		const modal = document.createElement("div");
		modal.className = "modal";
		if (this.props.isBackdropClose === true) modal.dataset.close = "true";

		const container = document.createElement("div");
		container.className = "modal__container";
		if (this.props.width) container.style.width = this.props.width + "px";
		container.insertAdjacentHTML(
			"afterbegin",
			`<div class="modal__header">
				<span class="modal__title">${this.props.title}</span>
				<button class="modal__close" data-close="true">&times;</button>
			</div>`
		);

		const body = document.createElement("div");
		body.className = "modal__body";

		modal.append(container);
		container.append(body);

		this._createContent(this.props.content, body);

		if (this.props.footer) {
			const footer = document.createElement("div");
			footer.className = "modal__footer";

			this._createContent(this.props.footer, footer);

			container.append(footer);
		}

		modal.onclick = event => {
			if (event.target.dataset.close) this.close();
		};

		this._modal = modal;
	}

	open() {
		this._create();

		const body = document.querySelector("body");
		body.append(this._modal);
		body.classList.add("hidden");
	}

	close() {
		this._modal.classList.add("hide");
		document.querySelector("body").classList.remove("hidden")

		this._modal.addEventListener(
			"animationend",
			() => {
				// this._modal.classList.remove("hide");
				this._modal.remove();
			},
			{ once: true }
		);
	}

	_createContent(props, where) {
		for (let i = 0; i < props?.length; i++) {
			const element = document.createElement(props[i].tag);

			for (const [key, value] of Object.entries(props[i])) {
				if (key === "tag") {
					continue;
				} else if (key === "text") {
					element.innerHTML = value;
				} else if (key === "on") {
					element.addEventListener(value.event, value.func);
				} else {
					element.setAttribute(key, value);
				}
			}

			where.append(element);
		}
	}
}
