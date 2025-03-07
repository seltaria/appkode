export type User = {
  avatarUrl: string;
  birthday: string;
  department: "android" |
  "ios" |
  "design" |
  "management" |
  "qa" |
  "back_office" |
  "frontend" |
  "hr" |
  "pr" |
  "backend" |
  "support" |
  "analytics";
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  position: string;
  userTag: string;
}