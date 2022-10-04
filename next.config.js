/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MY_EMAIL: 'hellopuyup@gmail.com',
    API_ENDPOINT: "https://todo.api.devcode.gethired.id",
  }
}

module.exports = nextConfig
