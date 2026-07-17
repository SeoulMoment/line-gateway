import { lineApi } from "./comm";

async function main() {
  const profile = await lineApi("/info");

  console.log(profile);
}

main().catch(console.error);
