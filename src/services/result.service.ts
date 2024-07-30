import {Injectable} from '@angular/core';
import {ApexAxisChartSeries} from "ng-apexcharts";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  graphA: ApexAxisChartSeries = [{name: "Score",data: [11, 11, 20, 20, 20]}]; // ['Sensori-discriminative', 'Autre', 'Comportementale', 'Affectivo-émotionelle', 'Cognitive'],
  graphB: ApexAxisChartSeries = [{name: "Score",data: [13, 22, 31, 32, 32]}];
  graphC: ApexAxisChartSeries = [{name: "Score",data: [24, 17, 24, 27, 48]}];
  graphD: ApexAxisChartSeries = [{name: "Score",data: [31, 27, 48, 55, 61]}];
  graphE: ApexAxisChartSeries = [{name: "Score",data: [62, 41, 70, 65, 75]}];

  constructor() {
  }

  getGraph(reponseFirstUniqueQuestion: string | null | undefined) {
    const profil = this.getProfil(reponseFirstUniqueQuestion);
    switch (profil) {
      case "Profil A":
        return this.graphA;
      case "Profil B":
        return this.graphB;
      case "Profil C":
        return this.graphC;
      case "Profil D":
        return this.graphD;
      case "Profil E":
        return this.graphE;
    }
  }

  getProfil(reponseFirstUniqueQuestion: string | null | undefined) {
    switch (reponseFirstUniqueQuestion) {
      case "Pas du tout":
        return "Profil A"
      case "Plutôt non":
        return "Profil B"
      case "Neutre":
        return "Profil C"
      case "Plutôt oui":
        return "Profil D"
      case "Tout à fait":
        return "Profil E"
      default:
        return "Profil B"
    }
  }

}
