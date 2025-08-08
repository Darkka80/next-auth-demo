import type { User } from '@/types/user';

type RandomUserResponse = {
  results: Array<{
    name: { first: string; last: string };
    email: string;
    picture: { thumbnail: string };
  }>;
};

export function mapRandomUser(json: unknown): User {
  const r = (json as RandomUserResponse)?.results?.[0];
  if (!r) {
    return {
      name: { first: 'User', last: '' },
      email: 'user@example.com',
      picture: { thumbnail: '/avatar-fallback.png' },
    };
  }
  return {
    name: { first: r.name.first, last: r.name.last },
    email: r.email,
    picture: { thumbnail: r.picture.thumbnail },
  };
}
