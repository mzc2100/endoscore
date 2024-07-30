import {QuestionUniqueModel} from "./questionUnique/questionUnique.model";
import {QuestionDependanteModel} from "./questionDependante/questionDependante.model";
import {QuestionLibreModel} from "./questionLibre/questionLibre.model";
import {QuestionValeurParDefautModel} from "./questionValeurParDefaut/questionValeurParDefaut.model";
import {QuestionChoixMultipleModel} from "./questionChoixMultiple/questionChoixMultiple.model";
import {QuestionBinaireModel} from "./questionBinaire/questionBinaire.model";
import {QuestionCorp} from "./questionCorp/questionCorp.model";
import {QuestionRange} from "./questionRange/questionRange";

export class Survey {
    [key: string]: any;
    questionUnique!: QuestionUniqueModel[];
    questionDependante!: QuestionDependanteModel[];
    questionLibre!: QuestionLibreModel[]
    questionValeurParDefaut!: QuestionValeurParDefautModel[];
    questionBinaire!: QuestionBinaireModel[];
    questionChoixMultiple!: QuestionChoixMultipleModel[]
    questionCorp!: QuestionCorp[]
    questionRange!: QuestionRange[]
}
