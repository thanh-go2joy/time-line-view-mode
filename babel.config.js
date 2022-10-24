module.exports = {
  presets: [
    ['@babel/env', { targets: ['last 2 versions'] }]
  ],
  plugins: [
    '@babel/proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
    '@babel/proposal-nullish-coalescing-operator'
  ]
}
