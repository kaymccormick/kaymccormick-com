pipeline {
    agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
            steps {
	        sh 'yarn'
		sh 'yarn next build'
            }
        }
    }
}