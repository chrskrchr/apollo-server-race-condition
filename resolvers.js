async function generateFieldValue() {
    const value = Math.floor(Math.random() * 100);
    // flip a coin to decide whether we resolve with a string or reject with an error
    if (value < 50) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("bar async");
            }, Math.random() * 1000);
        });
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("error async"));
            }, Math.random() * 1000);
        });
    }
}

const resolvers = {
    Query: {
        async foo() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        bar1: generateFieldValue,
                        bar2: generateFieldValue,
                    });
                }, Math.random() * 1000);
            });
        },
    },
};

module.exports = resolvers;