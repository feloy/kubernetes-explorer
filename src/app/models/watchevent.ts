interface WatchEvent<T> {
    type: "ADDED" | "DELETED" | "MODIFED",
    object: T
}
