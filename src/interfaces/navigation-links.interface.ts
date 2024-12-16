interface brands {
  title: string;
  key: string;
}

interface SubLink {
  key: string;
  title: string;
  description?: string;
  brands?: brands[];
}

export interface NavigationLinks {
  title: string;
  href: string;
  subLinks?: SubLink[];
}
