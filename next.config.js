require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` })

module.exports = {
  env: {},
  trailingSlash: true,
  webpack5: true,
  images: {
    domains: ["mixkit.imgix.net"],
  },
}
