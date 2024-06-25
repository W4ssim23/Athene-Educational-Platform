export function filterEmptyValues(data) {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => value !== "" && value !== undefined
    )
  );
}
