import {PropositionParDefautModel} from "./propositionParDefaut.model";

export class QuestionValeurParDefautModel {
  libelle!: string;
  propositionParDefaut!: PropositionParDefautModel[];
  reponse!: PropositionParDefautModel | null;
  index!: number;
  sectionName!: string
}
