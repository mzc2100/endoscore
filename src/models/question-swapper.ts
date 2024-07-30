import {Survey} from "src/models/survey.model";
import {SurveyService} from "src/services/survey.service";

type QuestionType = keyof Survey;

export class QuestionSwapper {

  private questionTypeMapping: Record<QuestionType, any[]> = {
    questionUnique: [],
    questionDependante: [],
    questionLibre: [],
    questionValeurParDefaut: [],
    questionBinaire: [],
    questionChoixMultiple: [],
    questionCorp: [],
    questionRange: [],
  };

  constructor(private survey: Survey, private surveyService: SurveyService) {
    // Populate the question type mapping
    const questionTypes = Object.keys(this.questionTypeMapping) as QuestionType[];
    for (let i = 0; i < questionTypes.length; i++) {
      const type = questionTypes[i];
      this.questionTypeMapping[type] = this.survey[type];
    }

  }

  swapQuestions(index1: number, index2: number): void {
    const type1 = this.findQuestionTypeByIndex(index1);
    const type2 = this.findQuestionTypeByIndex(index2);

    // Swap questions within their respective arrays
    if (type1 && type2) {
      const questions1 = this.questionTypeMapping[type1];
      const questions2 = this.questionTypeMapping[type2];

      const question1 = questions1.find((q: any) => q.index === index1);
      const question2 = questions2.find((q: any) => q.index === index2);

      if (question1 && question2) {
        [question1.index, question2.index] = [question2.index, question1.index];
      }
    }

    this.generateUpdatedSurveyJson();
  }

  private findQuestionTypeByIndex(index: number): QuestionType | null {
    for (const type of Object.keys(this.questionTypeMapping) as QuestionType[]) {
      if (this.questionTypeMapping[type].find((q: any) => q.index === index)) {
        return type;
      }
    }
    return null;
  }


  generateUpdatedSurveyJson() {
    const updatedSurvey: Survey = {
      questionUnique: this.questionTypeMapping["questionUnique"],
      questionDependante: this.questionTypeMapping["questionDependante"],
      questionLibre: this.questionTypeMapping["questionLibre"],
      questionValeurParDefaut: this.questionTypeMapping["questionValeurParDefaut"],
      questionBinaire: this.questionTypeMapping["questionBinaire"],
      questionChoixMultiple: this.questionTypeMapping["questionChoixMultiple"],
      questionCorp: this.questionTypeMapping["questionCorp"],
      questionRange: this.questionTypeMapping["questionRange"],
    };

    //console.log(JSON.stringify(updatedSurvey, null, 2));

    this.surveyService.saveGeneratedJSON(JSON.stringify(updatedSurvey, null, 2));

  }
}
