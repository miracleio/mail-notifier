# Email Monitoring Service

A robust email notification system for monitoring backend applications and services. This service provides a simple API to send styled alerts, notifications, and status updates via email based on different event types and impact levels.

## Features

- **Event Classification**: Support for various event types (error, success, warning, info)
- **Impact Levels**: Visual indicators for critical, high, medium, and low impact events
- **Rich HTML Templates**: Color-coded emails with appropriate styling based on event type
- **Metadata Support**: Include structured data that gets nicely formatted in emails
- **Custom SMTP Credentials**: Override default settings per email if needed
- **Asynchronous Processing**: Non-blocking email sending
- **Application Source Tracking**: Identify which part of your system generated each alert
- **Attachment Support**: Include log files or other relevant data with alerts

## Installation

```bash
npm install
# or
yarn install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```txt
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
DEFAULT_TO_EMAIL=alerts@yourcompany.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

> **Note**: For Gmail, you'll need to use an "App Password" instead of your regular password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for details.

## Usage

### Basic Example

```typescript
import { MonitoringEmailService, EventType, ImpactLevel } from './services/email.service';

const emailService = new MonitoringEmailService();

// Send a simple info notification
await emailService.sendInfo({
  subject: "System Status Update",
  content: "All systems are operational"
});

// Send an error alert
await emailService.sendErrorAlert({
  subject: "Database Connection Failed",
  content: "Unable to connect to the main database",
  impactLevel: ImpactLevel.HIGH,
  sourceApplication: "Payment Service",
  metadata: {
    errorCode: "DB_CONN_FAILED",
    attempts: 3,
    lastQuery: "SELECT * FROM transactions"
  }
});
```

### Using the Webhook API

Send a POST request to `/api/webhook/email` with the following JSON body:

```json
{
  "to": "team@example.com",
  "subject": "API Rate Limit Warning",
  "content": "The API is approaching its rate limit (85% used)",
  "eventType": "warning",
  "impactLevel": "medium",
  "sourceApplication": "API Gateway",
  "metadata": {
    "currentRate": 850,
    "limit": 1000,
    "timeWindow": "1 minute"
  }
}
```

## API Reference

### Email Webhook Endpoint

**URL**: `/api/webhook/email`
**Method**: `POST`
**Body Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| to | string or string[] | No | Recipient email(s). Defaults to `DEFAULT_TO_EMAIL` env variable |
| subject | string | Yes | Email subject |
| content | string | Yes | Main content (supports HTML) |
| eventType | string | No | One of: "error", "success", "warning", "info". Defaults to "info" |
| impactLevel | string | No | One of: "critical", "high", "medium", "low" |
| sourceApplication | string | No | Name of the application/service generating the event |
| metadata | object | No | Additional structured data to include |
| attachments | array | No | Files to attach to the email |
| customCredentials | object | No | Override default SMTP credentials |

**Response**:

```json
{
  "message": "Email will be sent in the background",
  "eventType": "warning"
}
```

### Status Endpoint

**URL**: `/api/webhook/email/status`
**Method**: `GET`
**Response**:

```json
{
  "status": "operational",
  "message": "Email service is connected and operational"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
