import { Photo } from './photo';

export interface User {
  id: number;
  username: string;
  displayName: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests: string;
  lookingFor: string;
  introduction: string;
  photos?: Photo[];
}
