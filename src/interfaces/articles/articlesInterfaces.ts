import { articleData } from '../../redux/articles/articlesSlice';

export interface articlesResponse {
  response: { docs: articleData[] };
}
