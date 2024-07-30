import {PropositionLibreModel} from "./propositionLibre.model";

export class QuestionLibreModel {
  libelle!: string;
  propositionLibre!: PropositionLibreModel[];
  reponse!: null | PropositionLibreModel;
  index!: number;
  sectionName!: string
}
