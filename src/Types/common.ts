// https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

// https://github.com/microsoft/TypeScript/issues/15012#issuecomment-365453623
export type Required<T> =
  T extends object
    ? { [P in keyof T]-?: NonNullable<T[P]>; }
    : T;
// export type DeepRequired<T, U extends object | undefined = undefined> =
//   T extends object
//     ? { [P in keyof T]-?: NonNullable<T[P]> extends NonNullable<U | Function | Class> ? NonNullable<T[P]> : DeepRequired<NonNullable<T[P]>, U>; }
//     : T;

export type Hall = 'Battenfeld' | 'Douthart' | 'Grace Pearson' | 'KK Amini' | 'Krehbiel' | 'Margaret Amini' | 'Miller' | 'Pearson' | 'Rieger' | 'Sellards' | 'Stephenson' | 'Watkins';