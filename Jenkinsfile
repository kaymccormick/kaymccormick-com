pipeline {
    options { timeout(time: 10, unit: 'MINUTES') }
    agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
            steps {
	        sh 'yarn'
		sh 'rm -rf node_modules/docutils-react'
		sh 'mkdir node_modules/docutils-react'
		sh 'wget -O - https://jenkins.heptet.us/job/github/job/docutils-react/job/master/lastSuccessfulBuild/artifact/build/docutils-react.tar.gz | tar -zxf - -C node_modules/docutils-react'
		sh 'cd node_modules/docutils-react && yarn && cd ../..'
		sh 'yarn next build'
		sh 'mkdir -p build'
		sh 'tar --exclude kaymccormick-com.tar.gz --exclude-vcs -zcv . -f kaymccormick-com.tar.gz'
            }
        }
    }
   post {
      always {
      archiveArtifacts artifacts: 'kaymccormick-com*.tar.gz', fingerprint: true
      }
      }
 
}