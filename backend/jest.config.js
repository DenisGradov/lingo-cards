export default {
    transform: {
        "^.+\\.(js|jsx)$": ["babel-jest", { presets: ["@babel/preset-env"] }],
    },
    rootDir: './dist'
};
