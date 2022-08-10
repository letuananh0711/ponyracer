import { PonyModel } from './poney.model';

/* Interface for a model of the Race */
export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PonyModel>;
  startInstant: string;
}
