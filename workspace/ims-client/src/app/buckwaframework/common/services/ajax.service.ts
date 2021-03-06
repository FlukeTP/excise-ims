import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
@Injectable()
export class AjaxService {
  public static JSON_HEADER = new Headers({
    "Content-Type": "application/json"
  });
  public static FORM_HEADER = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  public static CONTEXT_PATH = "/ims-webapp/api/";
  public static isDebug = true;

  constructor(private http: Http) { }

  post(url: string, body: any, success: any, error?: any, header?: Headers) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      console.log("Params : ", body);
    }
    let httpHeader = AjaxService.JSON_HEADER;
    if (header) {
      httpHeader = header;
      // httpHeader = AjaxService.FORM_HEADER;
    }
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    return this.http
      .post(AjaxService.CONTEXT_PATH + url, body, { headers: httpHeader })
      .toPromise()
      .then(success)
      .catch(errorFn);
  }

  get(url: string, success: any, error?: any) {
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    let res = this.http
      .get(AjaxService.CONTEXT_PATH + url)
      .toPromise()
      .then(success)
      .catch(errorFn);
    //console.log("res : ", res.Json());
    return res;
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(url: string, success: any, error?: any) {
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    return this.http
      .delete(AjaxService.CONTEXT_PATH + url)
      .toPromise()
      .then(success)
      .catch(errorFn);
  }

  put(url: string, body: any, success: any, error?: any, header?: Headers) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      console.log("Params : ", body);
    }
    let httpHeader = AjaxService.JSON_HEADER;
    if (header) {
      httpHeader = header;
      // httpHeader = AjaxService.FORM_HEADER;
    }
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    return this.http
      .put(AjaxService.CONTEXT_PATH + url, body, { headers: httpHeader })
      .toPromise()
      .then(success)
      .catch(errorFn);
  }

  upload(url: string, body: any, success: any, error?: any, header?: Headers) {
    if (AjaxService.isDebug) {
      console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      console.log("Params : ", body);
    }
    var headers = new Headers();
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    console.log(body, " ", headers);

    return this.http
      .post(AjaxService.CONTEXT_PATH + url, body, { headers: headers })
      .toPromise()
      .then(success)
      .catch(errorFn);
  }

  download(url: string) {
    let full_url = AjaxService.CONTEXT_PATH + url;
    window.open(full_url);
  }



}
