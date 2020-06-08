import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
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
  listNamespaces(): Observable<Namespace[]> {
    return this.http.get(`${this.root}/api/v1/namespaces`)
      .pipe(
        map(response => response['items'])
      );
  }

  watchNamespaces(): Observable<Namespace[]> {
    let previousLen = 0;
    let namespaces: Namespace[] = [];
    return this.http.get(`${this.root}/api/v1/namespaces`,
      {
        params: {
          watch: 'true'
        },
        reportProgress: true,
        observe: 'events',
        responseType: 'text'
      }).pipe(
        map(event => {
          if (event.type === HttpEventType.DownloadProgress) {
            const partialText: string = event['partialText'];
            const newText = partialText.substr(previousLen);
            const lines = newText.split("\n");
            var fail = false;
            const result = lines
              .filter(str => str.length > 0)
              .filter(str => {
                try {
                  JSON.parse(str);
                  return true;
                } catch (e) {
                  fail = true;
                  return false;
                }
              })
              .map(str => JSON.parse(str));
            if (!fail) {
              previousLen = partialText.length;
              return result;
            }
            return [];
          }
        }),
        map((watchEvents: WatchEvent<Namespace>[]) => {
          if (watchEvents) {
            watchEvents.forEach((event: WatchEvent<Namespace>) => {
              switch (event.type) {
                case 'ADDED':
                  namespaces.push(event.object)
                  break;
                case 'DELETED':
                  namespaces = namespaces.filter(ns => ns.metadata.uid !== event.object.metadata.uid);
                  break;
              }
            })
          }
          return namespaces;
        })
      );
  }
}
