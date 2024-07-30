import {ReponseChoixMultiple} from "./ReponseChoixMultiple.model";

export class QuestionChoixMultipleModel {
  libelle!: string;
  propositions!: ReponseChoixMultiple[];
  reponses!: ReponseChoixMultiple[]
  index!: number;
  sectionName!: string
}
