import { evaluateResume } from "./src/lib/ai";
import { config } from "dotenv";
config();
async function run() {
  const res = await evaluateResume("I am a software engineer with React and Node.js experience.", "React, Node.js");
  console.log(res);
}
run();
