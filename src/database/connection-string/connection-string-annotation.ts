import { Annotation } from 'noose-injection';

export const PostgresConnectionStringAnnotation = new Annotation(
    'PostgresConnectionString'
);
export const DatabaseURLAnnotation = new Annotation('DatabaseURL');
