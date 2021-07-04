module.exports = {
    lintOnSave: false,
    devServer: {
      proxy: {
        "/": {
          target: "http://localhost:4000",
          secure: false,
          changeOrigin: true
        },
      },
    },
  };