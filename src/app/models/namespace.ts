interface Namespace {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: ObjectMeta,
    spec: NamespaceSpec,
    status: NamespaceStatus
}

interface NamespaceSpec {
    finalizers: string[]
}

interface NamespaceStatus {
    phase: string
}
