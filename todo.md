-   Add retry strategies for message queue (Linear n attempts)
-   Put messages in dead letter queue for subscriber when retry strategy fails
-   Record elapsed time metric in flag service
-   Add connection strategies for database
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
