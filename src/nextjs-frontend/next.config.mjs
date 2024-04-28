// next.config.mjs
const nextConfig = {
	// Enable CSS support
	css: {
	  // Enable CSS modules
	  modules: true,
	  // Enable automatic vendor prefixing
	  // You can omit this if you're not using any CSS that requires vendor prefixing
	  loaderOptions: {
		// Enable autoprefixer
		autoprefixer: true,
	  },
	},
  };
  
  export default nextConfig;
  