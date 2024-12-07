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

export interface Resources {
  id: string;
  label: string;
  createdAt: string;
  easy: EasyQuestions[];
  medium: MediumQuestions[];
  hard: HardQuestions[];
}

export interface EasyQuestions {
  id: string;
  question: string;
  solution: string;
  resourcesId: string;
}

export interface MediumQuestions {
  id: string;
  question: string;
  solution: string;
  resourcesId: string;
}
export interface HardQuestions {
  id: string;
  question: string;
  solution: string;
  resourcesId: string;
}

export enum NavbarMenu {
  SCHEDULE,
  INTERVIEW,
  TRACKER,
  RESOURCES,
  PROFILE,
  ADDJOB,
}
