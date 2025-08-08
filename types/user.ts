export interface User {
  name: { first: string; last: string };
  email: string;
  picture: { thumbnail: string };
}

export interface RandomUserResponse {
  results: Array<{
    name: { first: string; last: string };
    email: string;
    picture: { thumbnail: string };
  }>;
}
