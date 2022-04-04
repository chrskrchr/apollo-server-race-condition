function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateFieldValueFn(fieldName, seed) {
  console.log(`field=${fieldName} seed=${seed}`);
  return async () => {
    const mode = Number(seed % 100n);
    const delayMs = (Number(seed % 1000n) / 1000) * 100;
    if (mode < 45) {
      return "bar sync";
    } else if (mode < 90) {
      console.log(`Sleeping ${delayMs}ms`);
      await delay(delayMs);
      return "bar async";
    } else if (mode < 93) {
      throw new Error("error sync");
    } else if (mode < 96) {
      console.log(`Sleeping ${delayMs}ms`);
      await delay(delayMs);
      throw new Error("error async");
    } else {
      return null;
    }
  };
}

const resolvers = {
  Query: {
    async foo() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            bar1: generateFieldValueFn("bar1", process.hrtime.bigint()),
            bar2: generateFieldValueFn("bar2", process.hrtime.bigint()),
            bar3: generateFieldValueFn("bar3", process.hrtime.bigint()),
            bar4: generateFieldValueFn("bar4", process.hrtime.bigint()),
          });
        }, Math.random() * 1000);
      });
    },
  },
};

module.exports = resolvers;
