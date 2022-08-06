-   Add local metric connection strategy
-   Move Events service outside the service module
-   Move Identifier service outside the service module
-   Remove error handling from optional object
-   Add a status object which contains an error and if an error occured, otherwise it is in an ok state and has a value
    (Good for network) requests because code can operate off the error or if the object is just missing.
-   Move the creation of the message being saved to the emit function and instead load the message when sending it to subscribers
-   Add retry strategies for message queue (Linear n attempts)
-   Add id's for subscribers
-   Put messages in dead letter queue for subscriber when retry strategy fails
-   Record elapsed time metric in flag service
-   Run a live test to see if the metric is recorded in the database

Features

-   Logging
    -   Write to file in S3
-   Metrics
    -   Record metric
    -   Get metric by tag
-   Request Tracing
    -   Store all information about the request
    -   Store all information about any subsequent requests
    -   Store all information about the response
-   Flags
    -   Create flags
    -   Get flag by Id
    -   Create files that define flag definitions
-   Webhooks
    -   Create a webhook
-   SDK
    -   Subscribe to webhook
    -
