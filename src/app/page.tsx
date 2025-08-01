import { askGemini } from "@/app/actions/askGemini";

export default async function Page() {
  const result = await askGemini("Explain me all about bolt.new.");

  return <p>{result}</p>;
}