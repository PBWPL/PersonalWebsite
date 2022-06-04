export interface Developer {
  firstName: string;
  lastName: string;
  initials: string;
  jobTitle: string;
  homeUrl: string;
  works: TimeLine[];
  education: TimeLine[];
  knowsAbout: KnowsAbout;
  links: Link[];
}

export interface KnowsAbout {
  frontend: string[];
  backend: string[];
  devops: string[];
  ides: string[];
  softwares: string[];
  others: string[];
}

export interface TimeLine {
  name: string;
  city: string;
  country: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface Link {
  name: string;
  icon: any[];
  url: string;
  tooltipPosition: string;
}
