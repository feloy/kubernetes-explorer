# Kubernetes Explorer

Angular application that connects to your preferred
Kubernetes cluster to explore it.

This app demonstrates the direct access to the Kubernetes API server from a web app,
and especially the watch capabilities of the API that use the HTTP Chunked Transfer Encoding.


```
$ git clone https://github.com/feloy/kubernetes-explorer.git
$ cd kubernetes-explorer
$ ng build
$ kubectl proxy -w dist/k8s/ -P / --api-prefix=/k/
```

You can now visit http://localhost:8001 with your browser.

You can create or delete namespaces to see the effect in the seidebar content:

```
$ kubectl create namespace foo
$ kubectl delete namespace foo
```
