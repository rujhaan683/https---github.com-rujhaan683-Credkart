import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  postData (data:any) {
    return this.http.post<any>("http://localhost:3000/expensedata/", data)
  }
  getData () {
    return this.http.get<any>("http://localhost:3000/expensedata")
  }
  deleteData (id:number) {
    return this.http.delete<any>("http://localhost:3000/expensedata/" +id)
  }

  putData( data: any , id : number) {
    return this.http.put<any>("http://localhost:3000/expensedata/" +id , data)
  }
}
