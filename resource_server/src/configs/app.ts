const config = {
  port: process.env.PORT || 3000,
  isProduction: process.env.NODE_ENV === 'production',
};

export default config;