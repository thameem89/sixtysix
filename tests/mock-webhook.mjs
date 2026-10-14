// Test-only receiver. Accepts requests without storing any personal data.
import { createServer } from "node:http";
createServer((request, response) => {
  let bytes = 0;
  request.on("data", (chunk) => {
    bytes += chunk.length;
  });
  request.on("end", () => {
    response.writeHead(bytes > 0 ? 200 : 400, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ accepted: bytes > 0 }));
  });
}).listen(4567, "127.0.0.1", () =>
  console.log("Test webhook ready on 127.0.0.1:4567"),
);
