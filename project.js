document.addEventListener("DOMContentLoaded", () => {
	// Get project ID from URL (e.g. project.html?id=planet-looper)
	const params = new URLSearchParams(window.location.search);
	const projectId = params.get("id");

	if (!projectId) {
		document.getElementById("project-content").innerHTML = "<p>Project not found.</p>";
		return;
	}

	fetch("projects.json")
		.then(response => response.json())
		.then(projects => {
			const project = projects.find(p => p.id === projectId);

			if (!project) {
				document.getElementById("project-content").innerHTML = "<p>Project not found.</p>";
				return;
			}

			renderProject(project);
		})
		.catch(error => console.error("Error loading project:", error));
});

function renderProject(project) {
	const container = document.getElementById("project-content");
	let html = `
		<h2>${project.title}</h2>
		<img src="${project.coverImage}" alt="${project.title}" class="project-cover">
		<p class="project-short">${project.shortDescription}</p>
	`;

	project.sections.forEach(section => {
		switch (section.type) {
			case "intro":
				html += `<p>${section.content}</p>`;
				break;

			case "image":
				html += `
					<div class="project-image">
						<img src="${section.src}" alt="">
						<small>${section.caption || ""}</small>
					</div>`;
				break;

			case "three-image":
				html += `
					<div class="project-gallery">
						${section.images.map(img => `<img src="${img}" alt="">`).join("")}
						<small>${section.caption || ""}</small>
					</div>`;
				break;

			case "text":
				html += `
					<h3>${section.title}</h3>
					<p>${section.content}</p>`;
				break;

			case "embed":
				html += `
					<div class="project-embed">
						<iframe frameborder="0" src="${section.url}" allowfullscreen></iframe>
						<small>${section.caption || ""}</small>
					</div>`;
				break;
		}
	});

	container.innerHTML = html;
}
