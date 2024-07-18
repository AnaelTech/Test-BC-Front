export interface User {
  '@id': string;
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  roles: string;
  picture: string;
}

export interface ApiListResponse<T> {
  '@id': string;
  'hydra:totalItems': number;
  'hydra:member': T[];
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
  '@id': string;
  '@type': string;
  id?: number;
  name: string;
  description: string;
  picture: string;
  category: Category;
  quantity: number;
  price: number;
}

export interface Category {
  '@id': string;
  '@type': string;
  id?: number;
  name: string;
  parent?: string;
  children?: Category[];
  Prestation?: string[];
}

export interface Cart {
  id?: number;
  article: Article[];
  prestation: Prestation[];
  quantity: number;
  priceHT: number;
  priceTTC: number;
  TVA: number;
}

export interface Order {
  id?: number;
  client: string;
  statut: string[];
  total: number;
  article_commande: string[]; // TODO: change to OrderArticle[]
}
