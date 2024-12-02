export interface Interview {
  title: string;
  key: number;
  company: string;
  type: string;
  date: string;
  duration: string;
  link: string;
  guest?: string;
}

export interface Stage {
  id: number;
  name: string;
  label: string;
}
