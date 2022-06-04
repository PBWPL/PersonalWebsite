export const developerData = {
  firstName: $localize`:@@developerFirstName:Peter`,
  lastName: $localize`:@@developerLastName:Bec`,
  initials: 'PB',
  jobTitle: 'Fullstack Developer',
  homeUrl: 'https://becpiotr.dev',
  works: [
    {
      name: $localize`:@@workOneName:Elokom GmbH (Summer Job)`,
      city: 'Gerstetten',
      country: $localize`:@@workOneCountry:Germany`,
      role: $localize`:@@workOneRole:Helper`,
      description: $localize`:@@workOneDescription:terminating and testing network cables`,
      startDate: '2020-08-22T00:00:00.000Z',
      endDate: '2020-10-22T00:00:00.000Z'
    },
    {
      name: 'IMPROVEIT WEBDEVELOPMENT LTD',
      city: $localize`:@@workTwoCity:Cracow`,
      country: $localize`:@@workTwoCountry:Poland`,
      role: 'Web Developer',
      description: $localize`:@@workTwoDescription:bug fixing, adding features, code refactoring, customer service`,
      startDate: '2020-03-06T00:00:00.000Z',
      endDate: '2021-03-01T00:00:00.000Z'
    }
  ],
  education: [
    {
      name: $localize`:@@educationOneName:State University of Applied Sciences`,
      city: $localize`:@@educationOneCity:Nowy Sacz`,
      country: $localize`:@@educationOneCountry:Poland`,
      role: 'Student',
      description: $localize`:@@educationOneDescription:I graduated with a Bachelor of Science degree in Computer Science.`,
      startDate: '2017-10-01T00:00:00.000Z',
      endDate: '2021-02-08T00:00:00.000Z'
    }
  ],
  knowsAbout: {
    frontend: [
      'Angular',
      'Angular CDK',
      'Angular Material',
      'TypeScript',
      'JavaScript',
      'jQuery',
      'RxJS',
      'Chart.js',
      'HTML',
      'CSS',
      'SCSS',
      'Bootstrap',
      'Tailwind'
    ],
    backend: ['Node.js', 'Express.js', 'PHP', 'Laminas (Zend)', 'Python', 'MySQL', 'Apache', 'nginx'],
    devops: ['Docker', 'GCP', 'Jenkins'],
    ides: ['WebStorm', 'PhpStorm', 'PyCharm', 'Android Studio', 'VSC', 'Sublime Text'],
    softwares: [
      'Postman',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe AfterEffects',
      'MS Office',
      'AutoCAD',
      'Ubuntu',
      'macOS'
    ],
    others: ['GIT', 'REST API', 'RWD', 'SEO', 'PWA', 'JWT', 'Agile', 'Terminal']
  },
  links: [
    {
      name: 'LinkedIn',
      icon: ['fab', 'linkedin-in'],
      url: 'https://www.linkedin.com/in/piotr-bec/?locale=en_US',
      tooltipPosition: 'above'
    },
    {
      name: 'Email',
      icon: ['far', 'envelope'],
      url: 'mailto:helloworld@becpiotr.dev',
      tooltipPosition: 'left'
    },
    {
      name: 'BuyMeCoffe',
      icon: ['fas', 'mug-hot'],
      url: 'https://www.buymeacoffee.com/becpiotr',
      tooltipPosition: 'left'
    },
    {
      name: 'Github',
      icon: ['fab', 'github'],
      url: 'https://github.com/PBWPL',
      tooltipPosition: 'left'
    },
    {
      name: 'GitLab',
      icon: ['fab', 'gitlab'],
      url: 'https://gitlab.com/PBPL',
      tooltipPosition: 'below'
    }
  ]
};
