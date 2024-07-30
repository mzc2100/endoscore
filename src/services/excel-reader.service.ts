import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { SurveyService } from './survey.service';

@Injectable({
  providedIn: 'root',
})
export class ExcelReaderService {

  constructor(private surveyService: SurveyService) {}

  readHospitalsFromExcel(): Promise<
    Map<string, { name: string; contact: string, comment: string}[]>
  > {
    return new Promise((resolve, reject) => {
      const filePath = 'assets/doctors.xlsx';

      fetch(filePath)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
          const sheetName: string = workbook.SheetNames[4];
          const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
          const regionsAndDoctorsMap: Map<string,{ name: string; contact: string; comment: string }[]> = new Map();
          let currentRow: string = '';

          let prevRegion: string = "";
          XLSX.utils
            .sheet_to_json(worksheet, { header: 1, raw: false, defval: '' })
            .forEach((row: unknown) => {

              if ((row as string) !== '') {
                // This row is a region
                currentRow = row as string;
                currentRow += "";

                const [rawRegion, hospitalName, ...commentairesParts] = currentRow.split(',');

                // Sanitize and capitalize the region string
                const region = this.surveyService.removeAccentsAndCapitalize(rawRegion);

                // Combine remaining address parts
                const filteredComments = commentairesParts.filter(comment => comment !== "");
                let address = filteredComments.shift();
                let comments = filteredComments.join(',');
                comments = comments.replace(/(^,)|(,$)/g, '').trim();

                if(region != ''){
                  prevRegion = region;
                  if(hospitalName != '' && address != ''){
                    /* if region is new set and add data to new region*/
                    if (!regionsAndDoctorsMap.get(region)) {
                      regionsAndDoctorsMap.set(region, [{name: hospitalName , contact: address!, comment: comments}]);
                    } else {
                      // Add doctor's name and address to the list for existing region
                      regionsAndDoctorsMap.get(region)?.push({ name: hospitalName, contact: address!, comment: comments });
                    }
                  }

                } else {
                  /* first column empty */
                  if(hospitalName != '' && address != ''){
                    // Add doctor's name and address to the list to the previously found region
                    regionsAndDoctorsMap.get(prevRegion)?.push({ name: hospitalName, contact: address!, comment: comments });
                  }
                }
              }
            });

          // debug in console
          /* for (const [region, doctors] of regionsAndDoctorsMap) {
            console.log(`Region: ${region}`);
            for (const doctor of doctors) {
                console.log(`Name: ${doctor.name}, Address: ${doctor.contact}`);
            }
          } */


          resolve(regionsAndDoctorsMap);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  readDoctorsFromExcel(): Promise<
    Map<string, { name: string; contact: string }[]>
  > {
    return new Promise((resolve, reject) => {
      const filePath = 'assets/doctors.xlsx';

      fetch(filePath)
        .then((response) => response.arrayBuffer())
        .then((data) => {
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
          const sheetName: string = workbook.SheetNames[3];
          const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
          const regionsAndDoctorsMap: Map<string,{ name: string; contact: string }[]> = new Map();
          let currentRow: string = '';

          let prevRegion: string = "";
          XLSX.utils
            .sheet_to_json(worksheet, { header: 1, raw: false, defval: '' })
            .forEach((row: unknown) => {

              if ((row as string) !== '') {
                // This row is a region
                currentRow = row as string;
                currentRow += "";

                const [region, doctorName, ...addressParts] = currentRow.split(',');

                // Combine remaining address parts
                let address = addressParts.join(',');
                address = address.replace(/(^,)|(,$)/g, '').trim();

                if(region != ''){
                  prevRegion = region;
                  if(doctorName != '' && address != ''){
                    /* if region is new set and add data to new region*/
                    if (!regionsAndDoctorsMap.get(region)) {
                      regionsAndDoctorsMap.set(region, [{name: doctorName , contact: address}]);
                    } else {
                      // Add doctor's name and address to the list for existing region
                      regionsAndDoctorsMap.get(region)?.push({ name: doctorName, contact: address });
                    }
                  }

                } else {
                  /* first column empty */
                  if(doctorName != '' && address != ''){
                    // Add doctor's name and address to the list to the previously found region
                    regionsAndDoctorsMap.get(prevRegion)?.push({ name: doctorName, contact: address });
                  }
                }
              }
            });

          // debug in console
          /* for (const [region, doctors] of regionsAndDoctorsMap) {
            console.log(`Region: ${region}`);
            for (const doctor of doctors) {
                console.log(`Name: ${doctor.name}, Address: ${doctor.contact}`);
            }
          } */


          resolve(regionsAndDoctorsMap);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
