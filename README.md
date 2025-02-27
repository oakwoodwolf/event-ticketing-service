This uses a client-server architecture.

## Customer Service
The customer service chat uses a third party API, Comet Chat, to handle to sending of messages and handling of agents. The calls are abstracted in the server `server.js`, to ensure the API key is not on the client's system. This migrates the concerns of securing the chats to this service, so we can focus on the implementation and other requirements.

The client has two pages: a homepage, where a user can activate a chat widget to talk to a customer support agent, And an agent dashboard, which contains a list of users registered from cometchat, that the agent can then respond to. If a customer has an issue regarding tickets or cancellation, the intent is the agent will then use the Admin panel to resolve the issue.

## Platform Administration