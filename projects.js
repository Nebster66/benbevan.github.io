document.addEventListener("DOMContentLoaded", () => {
	fetch("projects.json")
		.then(response => response.json())
		.then(projects => {
			const container = document.getElementById("projects-container");
			container.innerHTML = projects.map(project => `
				<div class="project-card card">
					<img src="${project.thumbnail}" alt="${project.title}">
					<h3>${project.title}</h3>
					<p>${project.shortDescription}</p>
					<div class="project-tags">
						${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
					</div>
					<a href="project.html?id=${project.id}" class="btn primary">View Project</a>
				</div>
			`).join("");
		})
		.catch(error => console.error("Error loading projects:", error));
});
