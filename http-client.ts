import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

(async () => {
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
})();
