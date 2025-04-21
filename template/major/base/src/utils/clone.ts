/**
 * Deep clone an object or array
 * @template T
 * @param {T} source - The source object or array to clone
 * @returns {T} A deep clone of the source object or array
 */
export function clonedeep<T>(source: T): T {
  return Array.isArray(source)
    ? source.map((item) => clonedeep(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === 'object'
    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
        Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
        o[prop] = clonedeep((source as { [key: string]: any })[prop]);
        return o;
      }, Object.create(Object.getPrototypeOf(source)))
    : (source as T);
}
