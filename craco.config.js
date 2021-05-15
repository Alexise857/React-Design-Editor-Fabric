const path = require("path")

const resloveSrc = (...paths) => path.join(__dirname, "src", ...paths)

module.exports = {
  webpack: {
    alias: {
      "@": resloveSrc(),
      "@assets": resloveSrc("assets"),
      "@constants": resloveSrc("constants"),
      "@components": resloveSrc("components"),
      "@scenes": resloveSrc("scenes"),
      "@store": resloveSrc("store"),
      "@services": resloveSrc("services"),
      "@utils": resloveSrc("utils"),
    },
  },
}
