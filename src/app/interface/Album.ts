import {Song} from "./Song";
import {User} from "./User";

export interface Album {
  id?: number;
  name?: string;
  user?: User;
  songList?: Song[];
}
