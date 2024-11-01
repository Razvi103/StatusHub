# StatusHub

StatusHub is an application designed to monitor the health and status of other applications through their endpoints. The application offers both a Developer Dashboard and a Public Dashboard, allowing developers to monitor their applications' endpoints in real-time and users to report bugs. 

StatusHub was developed during the [iTEC](https://itec.ro/) hackathon by a team of three university colleagues. I worked on the backend alongside another teammate, where I implemented several key features, including specific endpoints, the notification system, the integration with the OpenAI API, and other backend logic. Our collaboration and effective task delegation helped us secure second place in the competition.

## Features

### Tier 1: Application & Endpoint Management
- **Developer Dashboard**: Accessible only after authentication (via username/password or social media accounts).
- **Add Applications**: Developers can add multiple applications for monitoring.
- **Register Endpoints**: Each application can have multiple endpoints registered for monitoring.
- **Endpoint Monitoring Dashboard**: Developers can view the status of all endpoints for a particular application over the last X days/hours.

### Tier 2: Endpoint Health Monitoring
- **Automatic Polling**: StatusHub calls each registered endpoint at intervals of X seconds.
- **Endpoint Status**: Endpoints are assigned one of the following statuses based on the last 10 calls:
  - **Stable**: All last 10 responses are HTTP 200 or 302.
  - **Unstable**: At least one of the last 10 responses is not HTTP 200 or 302.
  - **Down**: None of the last 10 responses are HTTP 200 or 302.
- **Application Status**: The overall status of an application is determined by the cumulative statuses of its endpoints:
  - **Stable**: All endpoints are Stable.
  - **Unstable**: At least one endpoint is Unstable or Down.
  - **Down**: All endpoints are Down.

### Tier 3: Bug Reporting
- **Public Dashboard**: Allows any user or visitor to report a bug.
- **Bug Tracking**: Reported bugs appear in a dedicated section of the Developer Dashboard.
- **Status Impact**: If a bug is reported while the application is Stable, it will transition to Unstable until the bug is resolved. If the application is already Unstable or Down, the status remains unchanged.

### Tier 4: Developer Notifications
- **Bug Notifications**: Developers are notified when a bug is reported. The method of notification can vary and is customizable.
  
### Tier 5: Real-Time Updates & Settings
- **Real-Time Status Updates**: Endpoint statuses refresh in real-time on the Developer Dashboard.
- **Customizable Settings**: Developers can adjust the polling intervals for endpoint status checks and other relevant settings.

## Technologies Used
- **Frontend**: React
- **Backend**: Python (Flask Framework)
- **APIs**: 
  - OpenAI API
  - Twilio API
 
# Installation and Running the Application

## Prerequisites

- **Node.js** and **npm** for the client side.
- **Python 3.x** and **pip** for the server side.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alextz307/StatusHub.git
   cd StatusHub
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the server**
   ```bash
   cd server
   flask run
   ```

2. **Start the client**
   ```bash
   cd ../client
   npm run dev
   ```

3. **Access the application via the URL provided in the terminal output (probably http://localhost:5173)**
