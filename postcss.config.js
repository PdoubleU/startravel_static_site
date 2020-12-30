/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
module.exports = {
	plugins: [
		require('autoprefixer')({
			browsers: [ '> 1%', 'last 2 versions' ]
		}),
		require('cssnano')
	]
};
