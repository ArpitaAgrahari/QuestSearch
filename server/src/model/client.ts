import { createClient } from "@connectrpc/connect";
import { QuestionService } from "../../gen/question_pb";
import { createConnectTransport } from "@connectrpc/connect-node";

const transport = createConnectTransport({
  baseUrl: "http://localhost:4000",
  httpVersion: "1.1"
});

async function main() {
  const client = createClient(QuestionService, transport);
  const res = await client.search({ query: "Rearrange" ,type: "ANAGRAM", limit: 10, page:1});
  console.log(res);
}
void main();