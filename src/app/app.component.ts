import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KubernetesService } from './services/kubernetes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  namespaces: Observable<any>;

  constructor(private kube: KubernetesService) {}

  ngOnInit() {
    this.namespaces = this.kube.listNamespaces();
  }
}
