import {Label} from "./label";

export class QuestionRange {
  libelle!: string;
  min!: number;
  max!: number;
  step!: number;
  labels!: Label[]
  reponseMin!: number | null;
  reponseMax!: number | null;
  index!: number;
  sectionName!: string
}


