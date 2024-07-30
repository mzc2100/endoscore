import {PropositionBinaireModel} from "./propositionBinaire.model";

export class QuestionBinaireModel {
  libelle!: string;
  propositionBinaire!: PropositionBinaireModel;
  reponse!: string | null;
  index!: number;
  sectionName!: string
}
