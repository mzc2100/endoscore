import {Propostion} from "./propostion.model";

export class QuestionUniqueModel {
  libelle!: string;
  propositions!: Propostion[]
  reponse!: string | null
  index!: number
  sectionName!: string
}
