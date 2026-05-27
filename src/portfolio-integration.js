// Portfolio Integration Script
// Fetch dan tampilkan projects dari backend API

const API_BASE_URL = 'http://localhost:4000/api';

async function loadProjectsFromBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');

    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error('Failed to load projects from backend:', error);
    console.log('Using fallback portfolio data');
  }
}

function renderProjects(projects) {
  const portfolioTrack = document.querySelector('.portfolio-track');

  if (!portfolioTrack) return;

  // Clear existing static projects (keep only container structure)
  const existingCards = portfolioTrack.querySelectorAll('[data-project-card]');
  existingCards.forEach((card) => card.remove());

  // Render projects dari backend
  projects.forEach((project) => {
    const card = createProjectCard(project);
    portfolioTrack.appendChild(card);
  });
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className =
    'flex w-[80vw] min-w-[16rem] shrink-0 snap-start flex-col rounded-xl bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-72 md:w-80 md:p-5 lg:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]';
  card.setAttribute('data-project-card', 'true');

  const imageUrl = project.image_url
    ? `${API_BASE_URL.replace('/api', '')}${project.image_url}`
    : 'img/placeholder.png';
  const liveLink = project.live_demo_link || '#';
  const techStack = (project.tech_stack || []).join(', ');

  card.innerHTML = `
    <img
      src="${imageUrl}"
      alt="${project.title}"
      class="mb-3 h-36 w-full rounded-md object-cover md:h-40"
      onerror="this.src='img/placeholder.png'"
    />
    <h3 class="font-semibold text-sm md:text-lg mb-2">
      ${project.title}
    </h3>
    <p class="text-xs md:text-sm text-slate-500 mb-3">
      ${project.description}
    </p>
    ${techStack ? `<p class="text-xs text-slate-400 mb-2"><strong>Stack:</strong> ${techStack}</p>` : ''}
    <div class="mt-auto flex gap-2">
      ${
        project.live_demo_link
          ? `
        <a
          href="${project.live_demo_link}"
          target="_blank"
          rel="noreferrer"
          class="flex-1 inline-flex w-fit items-center justify-center rounded-full bg-teal-500 px-4 py-2 text-xs font-semibold text-white transition duration-300 hover:bg-teal-600 hover:scale-105 md:text-sm"
        >
          Live Demo
        </a>
      `
          : ''
      }
      ${
        project.github_link
          ? `
        <a
          href="${project.github_link}"
          target="_blank"
          rel="noreferrer"
          class="flex-1 inline-flex w-fit items-center justify-center rounded-full border border-teal-500 px-4 py-2 text-xs font-semibold text-teal-500 transition duration-300 hover:bg-teal-50 md:text-sm"
        >
          GitHub
        </a>
      `
          : ''
      }
    </div>
  `;

  return card;
}

// Load projects saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Tunggu sedikit untuk memastikan DOM siap
  setTimeout(() => {
    loadProjectsFromBackend();
  }, 500);
});
