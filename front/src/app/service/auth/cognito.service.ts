import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs'

@Injectable()
export class CognitoService {
  private userPool: CognitoUserPool;

  constructor() {
    AWS.config.region = environment.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.identityPoolId
    });
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId
    });
  }

  signUp(username: string, password: string): Observable<ISignUpResult> {
    const dataEmail = { Name: 'email', Value: username };
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute(dataEmail));
    return Observable.create(
      observer => this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(result);
        }
      })
    );
  }

  confirmation(username: string, confirmation_code: string): Observable<any> {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => cognitoUser.confirmRegistration(confirmation_code, true, (err, result) => {
      if (err) {
        return observer.error(err);
      } else {
        return observer.next(result);
      }
    }));
  }

  login(username: string, password: string): Observable<CognitoUserSession> {
    const cognitoUser = new CognitoUser({ Username: username, Pool: this.userPool });
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });
    return Observable.create(observer => cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const creds = this.buildCognitoCreds(result);
        AWS.config.credentials = creds;
        observer.next(result);
      },
      onFailure: (err) => {
        observer.error(err);
      }
    }));
  }

  private buildCognitoCreds(session: any): AWS.CognitoIdentityCredentials {
    const logins: AWS.CognitoIdentity.LoginsMap = {};
    const url = `cognito-idp.${environment.region}.amazonaws.com/${environment.userPoolId}`;
    logins[url] = session.getIdToken().getJwtToken();
    return new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.identityPoolId,
      Logins: logins
    });
  }

  logout() {
    this.userPool.getCurrentUser().signOut();
  }

  getCurrentUserName(): string{
    return this.userPool.getCurrentUser().getUsername();
  }

  // private getCredentials(): Observable<AWS.CognitoIdentityCredentials> {
  //   const cognitoUser = this.userPool.getCurrentUser();
  //   const credentials: Promise<AWS.CognitoIdentityCredentials> = new Promise((resolve, reject) => {
  //     if (cognitoUser === null) { reject(cognitoUser); }
  //     cognitoUser.getSession((err, session) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const creds = this.buildCognitoCreds(session);
  //         AWS.config.credentials = creds;
  //         resolve(creds);
  //       }
  //     });
  //   });
  //   return from(credentials);
  // }

  isAuthenticated(): Observable<CognitoUserSession> {
    const cognitoUser = this.userPool.getCurrentUser();
    return Observable.create(observer => {
      if (cognitoUser === null) { return observer.error(cognitoUser); }
      cognitoUser.getSession((err, session) => {
        if (!err && session.isValid) {
          return observer.next(session);
        } else {
          return observer.error(session);
        }
      })
    });
  }

}
