import { Annotation } from 'noose-injection';

export const FlagDatabaseURLVariableAnnotation = new Annotation(
    'FlagsDatabaseURLVariable'
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
export const MessageQueueDatabaseURLVariableAnnotation = new Annotation(
    'MessageQueueDatabaseURLVariable'
);
