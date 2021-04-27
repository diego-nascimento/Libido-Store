module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./src/Util/createSiteMap.js');
    }

    return config;
  },
};
