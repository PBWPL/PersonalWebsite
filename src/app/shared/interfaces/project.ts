export interface Project {
  name: string;
  shortName: string;
  individual?: boolean;
  techStack: Tech[];
  description: string;
  sourceUrl?: string;
  previewUrl?: string;
  featured?: boolean;
}

export interface Tech {
  name: string;
  iconClasses: any;
}
