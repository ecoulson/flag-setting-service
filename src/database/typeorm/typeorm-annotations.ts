import { Annotation } from 'noose-injection';

export const TypeORMDataSourceAnnotation = new Annotation('TypeORMDataSource');
export const PostgreSQLDataSourceAnnotation = new Annotation(
    'PostgreSQLDataSource'
);
