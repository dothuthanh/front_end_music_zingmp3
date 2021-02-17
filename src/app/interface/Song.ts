import {Style} from './Style';
import {User} from './User';
import {Like} from "./like";

export interface Song {
  id?: number;
  name?: string;
  image?: string;
  lyrics?: string;
  fileMp3?: any;
  dateSubmitted?: Date;
  singer?: string;
  author?: string;
  views?: number;
  style?: Style;
  user?: User;
  likes?: User[];
  liked?: boolean;
}
