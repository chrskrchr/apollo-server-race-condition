async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function syncNullError() {
    return null;
}

async function asyncNullError() {
    await delay(1000);
    return null;
}

function syncString() {
    return 'foo'
}

async function asyncString() {
    await delay(1000);
    return 'foo'
}

const resolvers = {
    Query: {
        syncNullError,
        asyncNullError,
        syncString,
        asyncString,

        async nested() {
            await delay(1000);
            return {
                syncNullError,
                asyncNullError,
                syncString,
                asyncString,
            }
        }
    }
};

module.exports = resolvers;
