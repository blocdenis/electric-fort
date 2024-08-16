export function getDirtyFields<T, P>(dirtyFields: P, formValues: T): any {
  if (typeof dirtyFields !== 'object' || dirtyFields === null || !formValues) {
    return {};
  }
  return Object.keys(dirtyFields).reduce((accumulator, key) => {
    const isDirty = dirtyFields[key as keyof P];

    const value = formValues[key as keyof T];

    // If it's an object, apply the logic recursively
    if (typeof isDirty === 'object' && isDirty !== null) {
      // eslint-disable-next-line no-param-reassign

      let acc = (accumulator[key as keyof T] = getDirtyFields(isDirty, value));
    }
    // If it's a dirty field, get the value from formValues
    else if (isDirty) {
      // eslint-disable-next-line no-param-reassign
      accumulator[key as keyof T] = value;
    }

    return accumulator as Partial<NonNullable<T>>;
  }, {} as Partial<NonNullable<T>>);
}
