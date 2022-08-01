export type WhereQuery<T> = {
    [Property in keyof T]?: T[Property];
};
