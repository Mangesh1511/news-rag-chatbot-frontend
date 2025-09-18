<img width="1469" height="809" alt="Screenshot 2025-09-18 at 4 33 59 PM" src="https://github.com/user-attachments/assets/063e89f8-8bd2-4291-b7c9-3d4b85efa661" /># Voosh AI Frontend

## Overview
This project is a ChatGPT-like web application built with React and SCSS, designed to interact with a Node.js backend via a streaming API. It provides a modern, mobile-friendly chat interface for users to ask questions and receive AI-generated answers, with support for session management and reference links.

## Workflow
1. **User Interaction**: Users enter questions in the chat input or select from sample questions.
2. **Session Management**: The app checks for a session ID in cookies (`redis.newsrag.session`). If found, it sends this session ID with each API request. If not found, it sends `null` and saves the session ID returned by the backend for future requests.
3. **API Request**: The frontend sends the user's question to the backend via `/api/ask` (supports streaming and REST, currently using rest endpoint).
4. **Response Handling**: The backend responds with an answer, references, and a session ID. The answer is rendered, and references are shown in a dropdown.
5. **State Update**: The chat history is updated with the user's question and the bot's answer. The session ID is stored in localStorage if provided.
6. **Mobile Friendly**: The UI adapts for mobile devices, ensuring usability and readability.

## Use Cases
- **Conversational AI**: Users can interact with the AI to get answers to their questions in real time.
- **Reference Retrieval**: Answers may include references, which are displayed for further reading.
- **Session Persistence**: User sessions are maintained across page reloads for a seamless experience.
- **Sample Questions**: Users can quickly start a conversation using provided sample questions.


## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server with `npm run start`.
4. Ensure the backend is running and accessible at the configured API endpoint.

## Screenshots
<!-- Add screenshots below -->

<img width="1470" height="736" alt="Screenshot 2025-09-18 at 4 30 24 PM" src="https://github.com/user-attachments/assets/948333c9-9bee-4c94-9a90-564e801dd760" />
<img width="1467" height="799" alt="Screenshot 2025-09-18 at 4 34 25 PM" src="https://github.com/user-attachments/assets/dbfe6bed-4d6d-4858-9589-6fdf08532d64" />



---

For more details, see the source code and comments in the `/src/components` and `/src/styles` directories.
