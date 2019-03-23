pipeline {
    options { timeout(time: 10, unit: 'MINUTES') }
    agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
            steps {
	        sh 'yarn'
		sh 'mkdir node_modules/docutils-react'
		sh 'wget -O - https://jenkins.heptet.us/job/github/job/docutils-react/job/master/lastSuccessfulBuild/artifact/build/docutils-react.tar.gz | tar -xf - -C node_modules/docutils-react'
		sh 'cd node_modules/docutils-react && yarn && cd ../..'
		sh 'yarn next build'
            }
        }
    }
}