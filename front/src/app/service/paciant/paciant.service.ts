import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CognitoService } from '../auth/cognito.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface Paciant {
  id: string;
  name: string;
  sex: Sex;
  age: number;
  result: Result;
  testedAt: Date;
  registeredBy: string;
}

export enum Sex {
  MALE, FEMALE
}

export const SEX_LABEL = {
  [Sex[Sex.MALE]]: '男性',
  [Sex[Sex.FEMALE]]: '女性'
}

export enum Result {
  WAITING, POSITIVE, NEGATIVE
}

export const RESULT_LABEL = {
  [Result[Result.WAITING]]: '結果待ち',
  [Result[Result.POSITIVE]]: '陽性',
  [Result[Result.NEGATIVE]]: '陰性'
}

@Injectable()
export class PaciantService {

  constructor(private cognito: CognitoService, private http: HttpClient) { }

  getAll(): Observable<Paciant[]> {
    const registeredBy = this.cognito.getCurrentUserName();
    return this.http.get<Paciant[]>(`${environment.apiRoot}/paciant`, { params: { registeredBy: registeredBy } });
  }

  getById(id: string): Observable<Paciant> {
    return this.http.get<Paciant>(`${environment.apiRoot}/paciant/${id}`);
  }

  add(paciant: Paciant) {
    const req = this.toRequest(paciant);
    console.log(req);
    return this.http.post<{ message: string }>(`${environment.apiRoot}/paciant`, req).pipe(map(r => r.message));
  }

  modify(paciant: Paciant) {
    const req = this.toRequest(paciant);
    console.log(req);
    return this.http.put<{ message: string }>(`${environment.apiRoot}/paciant/${paciant.id}`, req).pipe(map(r => r.message));
  }

  buildEmptyPaciant(): Paciant {
    return {
      id: '',
      name: '',
      sex: Sex.MALE,
      age: 20,
      result: Result.WAITING,
      testedAt: new Date(),
      registeredBy: this.cognito.getCurrentUserName()
    }
  };

  private toRequest(p: Paciant) {
    if (typeof p.testedAt == "string") {
      return p;
    }
    const testedAt = `${p.testedAt.getFullYear()}-${p.testedAt.getMonth() + 1}-${p.testedAt.getDate()}`;
    return Object.assign({}, p, { testedAt: testedAt });
  }

}
