module.exports = {
	configureWebpack:{
		resolve:{
			alias:{
				'assets':'@/assets',
				'utils':'@/utils',
				'network':'@/network',
				'views':'@/views',
        'components':'@/components',
        'common':'components/common'
			}
		}
	}
}
