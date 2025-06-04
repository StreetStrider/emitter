
var outlander = require('outlander')
var globals = require('outlander/globals')


module.exports =
[
	...outlander,
	{
		languageOptions:
		{
			sourceType: 'script',
			globals:
			{
				...globals.node,
			},
		},
	},
	{
		files: [ '**/*.js' ],
	},
	{
		ignores: [ 'perf/min_*.js' ],
	},
	{
		files: [ 'perf/perf.mjs' ],
		languageOptions:
		{
			sourceType: 'module',
		},
		rules:
		{
			'max-params': 0,
		},
	},
	{
		files: [ 'test/**/*.js' ],

		languageOptions:
		{
			globals:
			{
				...globals.mocha,
			},
		},

		rules:
		{
			'max-statements': 0,
			'no-unused-expressions': 0,
		},
	},
]
