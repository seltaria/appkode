import { DepartmentsValue } from "../enums";

export type User = {
  avatarUrl: string;
  birthday: string;
  department: DepartmentsValue;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  position: string;
  userTag: string;
}