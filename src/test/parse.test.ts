import parse from "../main/parse";

it("should test",  () => {
  const response = parse({
    sessionId: "123",
    utterance: "hello 123 world and my name is Petr Shypila yo and I am 26 years old!",
  });
  console.log(`${JSON.stringify(response)}`);
});
