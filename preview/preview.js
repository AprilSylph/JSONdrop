const preview = (value, config) => document.body.innerHTML = render(value, config);

window.addEventListener("load", () => {
	try {
		let params = (new URL(location)).searchParams;
		let object = params.get("object");
		if (object !== null) {
			preview(JSON.parse(object), JSON.parse(params.get("config")));
		}
	} catch (error) {
		preview({"error": error}, {autoOpenDepth: 1});
	}
});
