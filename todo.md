-   Put messages in dead letter queue for subscriber when retry strategy fails
-   Record elapsed time metric in flag service
-   Add connection strategies for database
-   Run a live test to see if the metric is recorded in the database
-   Move logged errors to status exceptions. Find a way to log the statuses that are errors, perhaps at request handling level?
-   Find places where optionals are being used in place of statuses to handle error states in the app
-   Find places where statuses should be used but aren't (retrieving from database can throw so needs a status)

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
    -   Get flag by name
    -   Create files that define flag definitions
-   Webhooks
    -   Create a webhook
-   SDK
    -   Subscribe to webhook
    -
