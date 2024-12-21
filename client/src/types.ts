export interface Interview {
  title: string;
  id: string;
  company: string;
  type: string;
  date: string;
  duration: string;
  link: string;
  guest?: string;
  userId?: string;
  notification?: string;
}

export interface Stage {
  id: number;
  name: string;
  label: string;
  jobCards: JobCardData[];
}
export interface JobCardData {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
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
export interface Payload {
  id?: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
  username: string;
}

export interface Address {
  id?: string;
  line1?: string;
  line2?: string;
  state?: string;
  country?: string;
  city?: string;
  pincode?: string;
}

export interface Skill {
  value: string;
  label: string;
}
export interface Education {
  id?: string;
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  duration?: string;
  grade?: string;
  username?: string;
}

export interface Experience {
  id?: string;
  username?: string;
  title?: string;
  company?: string;
  duration?: string;
  about?: string;
}

export interface User {
  username?: string;
  email?: string;
  phoneNumber?: string;
  about?: string;
  profileImg?: string;
  name?: string;
}

export interface Column {
  id?: string;
  columnTitle: string;
  idx?: number;
  jobIdx?: string[];
  username?: string;
  jobs?: Job[];
}

export interface Job {
  id: string;
  jobtitle: string;
  company: string;
  about?: string;
  link?: string;
  list: string | number;
  columnId?: string;
  note?: string;
}
