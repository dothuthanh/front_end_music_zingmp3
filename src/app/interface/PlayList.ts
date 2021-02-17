import {User} from 'firebase';
import {Song} from './Song';

export interface PlayList {
  id?: number;
  user?: User;
  song?: any[];
}
