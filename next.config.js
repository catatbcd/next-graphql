/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        //variables para firebird

        DBSOURCE: "C:/db/gitHubUser.fdb",
        DBHOST: "127.0.0.1",
        DBPORT: 3050,
        DBUSER: "SYSDBA",
        DBPASSWORD: "masterkey",
      },
      reactStrictMode: false,
      swcMinify: true,
      images: {
        domains: ["avatars.githubusercontent.com"],
      },
    };
  }
  return {
    env: {
      //variables para firebird

      DBSOURCE: "C:/db/gitHubUser.fdb",
      DBHOST: "127.0.0.1",
      DBPORT: 3050,
      DBUSER: "SYSDBA",
      DBPASSWORD: "masterkey",
    },
    reactStrictMode: false,
    swcMinify: true,
    images: {
      domains: ["avatars.githubusercontent.com"],
    },
  };
};

module.exports = nextConfig;
