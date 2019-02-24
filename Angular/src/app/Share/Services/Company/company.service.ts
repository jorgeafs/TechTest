import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiUrl } from 'src/app/Models/api-url';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Company } from '../../../Models/company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl: ApiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.api;
   }

  public GetCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl.host}${this.apiUrl.endpoints.getCompanies}`);
  }

  public GetCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl.host}${this.apiUrl.endpoints.getCompany}/${id}`);
  }

  public PostCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl.host}${this.apiUrl.endpoints.postCompany}`, company, httpOptions);
  }

  public PutCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl.host}${this.apiUrl.endpoints.putCompany}`, company, httpOptions);
  }

  public DeleteCompany(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl.host}${this.apiUrl.endpoints.deleteCompany}/${id}`);
  }
}
