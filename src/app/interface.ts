export interface User {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  roles: string;
  picture: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface Prestation {
  id?: number;
  name: string;
  description: string;
  picture: string;
  price: number;
  category: string;
}

export interface Article {
  id?: number;
  name: string;
  description: string;
  picture: string;
  category: string;
}

export interface Category {
  id?: number;
  name: string;
}
