import express, { type Request, type Response } from "express";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { sdkStart } from "./instrumentation";

sdkStart({
  serviceName: "proxy-server",
});

const app = express();
app.use(express.json());

app.post("/mcp", async (req: Request, res: Response) => {
  const url = new URL("http://localhost:3000/mcp");
  const client = new Client({
    name: "streamable-http-client",
    version: "1.0.0",
  });
  const transport = new StreamableHTTPClientTransport(url);
  await client.connect(transport);

  const result = await client.callTool({
    name: "get-forecast",
    arguments: {
      latitude: 38.6272,
      longitude: -90.1978,
    },
  });
  console.log(result);

  res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy Server listening on port ${PORT}`);
});
