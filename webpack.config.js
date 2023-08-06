module.exports = function (webpackEnv) {
    // ...
    return {
        // ...
        resolve: {
            // ...
            fallback: {
                // 👇️👇️👇️ add this 👇️👇️👇️
                "fs": false,
                "os": false,
                "path": false,
            },
            modules: ['node_modules', path.resolve(__dirname, 'src')],

        },

    }
}
