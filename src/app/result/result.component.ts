import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Survey} from "../../models/survey.model";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill, ApexOptions,
  ApexPlotOptions, ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";
import {SurveyService} from "../../services/survey.service";
import {ThemePalette} from "@angular/material/core";
import {ApexResponsive} from "ng-apexcharts/lib/model/apex-types";
import {Region, RegionService} from "../../services/region.service";
import {ResultService} from "../../services/result.service";
import {ExcelReaderService} from "../../services/excel-reader.service";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent {
  @Input() color: ThemePalette = "warn";
  @Input() survey: Survey | undefined;
  @Input() currentQuestionIndex: number = 0;
  @Output() precedentSection = new EventEmitter<boolean>();
  @Output() nextSection = new EventEmitter<boolean>();
  @Output() currentQuestionIndexChange = new EventEmitter<number>();
  currentQuestionIndexMultipleform = 0;


  chartOptions: ApexOptions = {
    series: [
      {
        name: "Score",
        data: [80, 50, 30, 40, 100] // ['Sensori-discriminative', 'Autre', 'Comportementale', 'Affectivo-émotionelle', 'Cognitive']
      },
    ],
    chart: {
      width: 800,
      height: 800,
      type: "radar",
    },
    tooltip: {
      custom: function ({series, seriesIndex, dataPointIndex, w}) {
        let label = w.globals.labels[dataPointIndex];
        let definition = ""
        if (label == 'Sensori-discriminative') {
          definition = "Capacité d'une personne à percevoir & différencier,<br> des stimuli sensoriels.";
        } else if (label == 'Autre') {
          definition = "Aspects non couverts par les autres catégories.";
        } else if (label == 'Comportementale') {
          definition = "Les actions, les réactions ou les habitudes <br> d'une personne dans différentes situations";
        } else if (label == 'Affectivo-émotionelle') {
          definition = "Portent sur les émotions, les sentiments,<br> les réactions émotionnelles et l'humeur.";
        } else if (label == 'Cognitive') {
          definition = "Questions cognitives portent sur la mémoire,<br> l'attention, la résolution de problèmes...";
        }
        return (
          "<div class='tooltip'>" + "<h3>" + w.globals.labels[dataPointIndex] + ":" + "</h3>"
          + definition +
          "<span><h3>" + "Score:" + "</h3>" + series[seriesIndex][dataPointIndex] + "</span>" + "</div>"
        );
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
        }
      },
    ],
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#e8e8e8',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    },
    xaxis: {
      categories: ['Sensori-discriminative', 'Autre', 'Comportementale', 'Affectivo-émotionelle', 'Cognitive'],
      labels: {
        style: {
          colors: ['#ff7f50', '#ff7f50', '#ff7f50', '#ff7f50', '#ff7f50', '#ff7f50'],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      show: true,
      labels: {
        show: true
      },
    },
    title: {
      text: ""
    },
    dataLabels: {
      enabled: false,
      background: {
        enabled: true,
        borderRadius: 2,
      },
      style: {
        fontFamily: "Helvetica, Arial, sans-serif",
        colors: ['#ff7f50'],
        fontWeight: 400,
      }
    },
    fill: {
      opacity: 0.2,
      colors: ['#F44336']
    },
    stroke: {
      colors: ['#fff']
    },
    markers: {
      size: 6,
      colors: ['#F47986'],
      strokeColors: '#fff',
    }
  };

  selectedTabIndex = 0;
  selectedRegion: Region | undefined;
  regions: Region[] = [];
  profil: string = "";
  doctorsForRegion: { name: string, contact: string }[] = [];
  hospitalsForRegion: { name: string, contact: string, comment: string }[] = [];

  constructor(private surveyService: SurveyService, private regionService: RegionService, private excelService: ExcelReaderService, private resultService: ResultService) {
    this.regionService.getRegions().subscribe((regions) => {
      this.regions = regions;
    });

    if(this.surveyService.getSurveyData()?.questionUnique?.length! > -1){
      const reponseFirstUniqueQuestion = this.surveyService.getSurveyData()?.questionUnique[0]?.reponse;
      let data = this.resultService.getGraph(reponseFirstUniqueQuestion);
      this.chartOptions.series = data;
      this.profil = this.resultService.getProfil(reponseFirstUniqueQuestion);
    }
  }

  onRegionChange(region: Region) {
    this.loadHospitalsFromExcel(this.surveyService.getRegionNameFromCode(this.selectedRegion?.code));
  }

  loadHospitalsFromExcel(regionName: string | undefined): void {
    this.excelService.readHospitalsFromExcel()
      .then((regionsAndHospitalsMap: Map<string, { name: string, contact: string, comment: string }[]>) => {

        if (regionName != undefined){
          this.hospitalsForRegion = regionsAndHospitalsMap.get(regionName) || [];
        }
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
      });
  }

  loadDoctorsFromExcel(regionName: string | undefined): void {
    this.excelService.readDoctorsFromExcel()
      .then((regionsAndDoctorsMap: Map<string, { name: string, contact: string }[]>) => {

        if (regionName != undefined)
          this.doctorsForRegion = regionsAndDoctorsMap.get(regionName) || [];

          console.log(regionName);
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
      });
  }

  getReponse() {
    // TODO : Faire demo pour selon question => donner profil
  }


  goToPreviousQuestion() {
    if (this.currentQuestionIndexMultipleform > 0) {
      this.currentQuestionIndexMultipleform--;
      this.currentQuestionIndex--;
    } else {
      this.precedentSection.emit(true);
    }

  }

  goToNextQuestion() {
    if (this.survey) {
      const questionChoixMultiple = this.survey.questionChoixMultiple;
      if (questionChoixMultiple) {
        if (this.currentQuestionIndexMultipleform < questionChoixMultiple.length - 1) {
          this.currentQuestionIndexMultipleform++;
          this.currentQuestionIndex++;
        } else {
          this.nextSection.emit(true);
        }
      }
    }
  }
}
