import { Annotation } from 'noose-injection';

export const DatabaseURLVariableAnnotation = new Annotation(
    'DatabaseURLVariable'
);
export const LogLevelVariableAnnotation = new Annotation('LogLevelVariable');
export const DropSchemaVariableAnnotation = new Annotation(
    'DropSchemaVariable'
);
export const SynchronizeVariableAnnotation = new Annotation(
    'SynchronizeVariable'
);
export const DialectVariableAnnotation = new Annotation('DialectVariable');
export const MetricDatabaseURLVariableAnnotation = new Annotation(
    'MetricDatabaseURLVariable'
);
export const LogsDatabaseURLVariableAnnotation = new Annotation(
    'LogsDatabaseURLVariable'
);