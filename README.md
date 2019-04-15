# Kubernetes Explorer

Angular application that connects to your preferred
Kubernetes cluster to explore it.

```
$ git clone https://github.com/feloy/kubernetes-explorer.git
$ cd kubernetes-explorer
$ ng build
$ kubectl proxy -w dist/k8s/ -P / --api-prefix=/k/
```

You can now visit http://localhost:8001 with your browser.
 