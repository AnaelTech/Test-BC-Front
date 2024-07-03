export interface User {
  id?: number;
  Name: string;
  Lastname: string;
  email: string;
  password?: string;
  roles: string;
  profilPicture: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}
