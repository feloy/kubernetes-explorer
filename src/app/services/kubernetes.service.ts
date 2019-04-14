import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KubernetesService {

  /**
   * The URL of the Kubernetes API Server
   */
  private root = 'http://localhost:8001/k';

  constructor(private http: HttpClient) { }

  /**
   * List the namespaces
   */
  listNamespaces(): Observable<any> {
    return this.http.get(`${this.root}/api/v1/namespaces`)
    .pipe(
      map(response => response['items'])
    );
  }
}
