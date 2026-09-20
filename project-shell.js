(function () {
  document.body.classList.add('portfolio-restored-project');
  if (document.querySelector('.restored-shell-header')) return;

  const header = document.createElement('header');
  header.className = 'restored-shell-header';
  header.innerHTML = `
    <a class="restored-shell-logo" href="/" aria-label="Mohammed Ubaidah home">MU<span>.</span></a>
    <nav class="restored-shell-nav" aria-label="Primary navigation">
      <a href="/#work">Work</a>
      <a href="/about/">About</a>
      <a href="/fun/">Fun</a>
    </nav>`;
  document.body.prepend(header);

  const projectIntroductions = {
    '/projects/nioh/': {
      title: 'Title sequence & visual exploration',
      copy: 'I created this Nioh title-sequence exploration by combining cinematic pacing, Japanese typography and atmospheric image-making. My role covered the visual direction and animation, using controlled reveals and shifts in scale to build tension while staying rooted in the world of the game.'
    },
    '/projects/ford/': {
      title: 'Brand motion exploration',
      copy: 'For Ford, I developed motion explorations across the brand’s visual language. I worked with the logo, graphic elements and automotive imagery to create clear, confident transitions that could feel consistent across different campaign formats while keeping the car at the centre of each piece.'
    }
  };

  const introduction = projectIntroductions[window.location.pathname];
  if (introduction && !document.querySelector('.portfolio-project-intro')) {
    const section = document.createElement('section');
    section.className = 'portfolio-project-intro';
    section.innerHTML = `<p class="portfolio-project-intro__label">My role</p><div><h2>${introduction.title}</h2><p>${introduction.copy}</p></div>`;
    const firstSection = document.querySelector('main .page-section, main section');
    if (firstSection) firstSection.insertAdjacentElement('afterend', section);
  }
})();
