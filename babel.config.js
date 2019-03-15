module.exports = {
  "env": {
    "production": {
	"plugins": ["emotion"],
	presets: ['@babel/preset-env', '@babel/preset-react', '@emotion/babel-preset-css-prop', 'next/babel'],

    },
    "development": {
	"plugins": [["emotion", { "sourceMap": true }]],
	presets: ['@babel/preset-env', '@babel/preset-react', '@emotion/babel-preset-css-prop', 'next/babel'],
    }
  }
//}    
//    plugins: ['emotion', '@babel/plugin-syntax-dynamic-import']
};
