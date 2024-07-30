import {PropositionDependanteModel} from "./propositionDependante.model";

export class QuestionDependanteModel {
  libelle!: string;
  propositionDependante!: PropositionDependanteModel[];
  reponse!: PropositionDependanteModel | null;
  index!: number;
  sectionName!: string
}
