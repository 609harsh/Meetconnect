import { Request } from "express";

export interface JWTError {
  name?: string;
  message?: string;
}
export interface Payload {
  name: string;
  email: string;
  id: string;
  username: string;
  iat: number;
  exp: number;
}
export interface CustomRequest extends Request {
  userId?: string; // Extend Request to include userId
  username?: string;
}

export interface Column {
  id?: string;
  columnTitle: string;
  idx: number;
  jobIdx?: string[];
  username?: string;
}
export interface Job {
  id?: string;
  company: string;
  columnId?: string;
  note?: string;
  link?: string;
  jobtitle: string;
  idx?: number;
}
export interface Interview {
  title: string;
  type: string;
  company: string;
  date: string;
  duration?: string;
  guest?: string;
  notification?: string;
  link?: string;
}

export interface UserUpdate {
  about?: string;
  phoneNumber?: string;
  name?: string;
}

export interface UserAddress {
  line1?: string;
  line2?: string;
  state?: string;
  country?: string;
  pincode?: string;
  city?: string;
}

export interface UserEducation {
  school?: string;
  degree?: string;
  grade?: string;
  fieldOfStudy?: string;
  duration?: string;
}

export interface Skill {
  value: string;
  label: string;
}

export interface WorkExperience {
  title?: string;
  company?: string;
  duration?: string;
  about?: string;
}
