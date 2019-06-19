import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FilingAnalysisService {
  baseUrl = "assets/mock-data/analyticsData.json";

  constructor(private httpClient: HttpClient) {}
  getFilingsData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json"
      })
    };

    return this.httpClient
      .get(this.baseUrl , httpOptions)
      // .pipe(
      //   retry(3),
      //   catchError(error => this.errorsHandler.handleError(error))
      // );
  }
}
