export default function selectColumns(collection: string[]) {
  if (collection.length) {
    return collection.reduce((bundle, key) => ({
      ...bundle,
      [key]: true,
    }), {} as Record<string, boolean>);
  }
}
