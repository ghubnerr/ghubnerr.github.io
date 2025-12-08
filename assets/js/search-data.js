// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "🚧 under construction! 🚧",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "🚧 under construction! 🚧",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-i-m-presenting-my-research-on-deep-rl-explainability-at-ncur",
          title: 'I’m presenting my research on Deep RL Explainability at NCUR.',
          description: "",
          section: "News",},{id: "news-i-ve-started-my-internship-at-nvidia-s-robotics-platform-team",
          title: 'I’ve started my internship at NVIDIA’s Robotics Platform Team!',
          description: "",
          section: "News",},{id: "news-i-m-honored-to-be-featured-on-fiu-s-honors-college-news",
          title: 'I’m honored to be featured on FIU’s Honors College News.',
          description: "",
          section: "News",},{id: "news-i-ve-joined-google-as-an-intern-at-youtube-s-trust-amp-amp-safety-team",
          title: 'I’ve joined Google as an intern at YouTube’s Trust &amp;amp;amp; Safety team!',
          description: "",
          section: "News",},{id: "news-i-m-honored-to-receive-the-fiu-2025-outstanding-graduates-award",
          title: 'I’m honored to receive the FIU 2025 Outstanding Graduates award!',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%61%62%72%69%65%6C%68%75%62%6E%65%72%6C%75%63%63%68%65%73%69@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ghubnerr", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/gabehubner", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/gabriel-lucchesi", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0008-5342-1219", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/g_hubnerr", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
