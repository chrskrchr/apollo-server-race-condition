async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const resolvers = {
    Query: {
        nonNullObject() {
            return {};
        },
    },
    Object: {
        async errorSoon() {
            console.log("errorSoon: top");
            await delay(20);
            console.log("errorSoon: delayed, gonna throw");
            throw new Error("error");
        },
        async nestedObjectSoon() {
            console.log("nestedObjectSoon: top");
            await delay(100);
            console.log("nestedObjectSoon: now returning");
            return {};
        },
        justAString() {
            console.log("justAString");
            return "hi";
        }
    }
};

module.exports = resolvers;
