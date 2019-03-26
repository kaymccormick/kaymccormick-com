pipeline {
    options { timeout(time: 10, unit: 'MINUTES') }
    agent { docker {
    image 'node:latest'
    args '-v /.cache:$HOME/.cache/v4'
 } }
    stages {
        stage('build') {
            steps {
	        sh 'yarn'
		sh 'rm -rf node_modules/docutils-react'
		sh 'mkdir node_modules/docutils-react'
		sh 'wget -O - https://jenkins.heptet.us/job/github/job/docutils-react/job/master/lastSuccessfulBuild/artifact/build/docutils-react.tar.gz | tar -zxf - -C node_modules/docutils-react'
		sh 'cd node_modules/docutils-react && yarn && cd ../..'
		sh 'yarn next build'
		sh 'mkdir -p tmp123'
		sh 'tar --exclude tmp123 --exclude-vcs -zc . -f tmp123/kaymccormick-com.tar.gz'
            }
        }
    }
   post {
      always {
      archiveArtifacts artifacts: 'tmp123/kaymccormick-com*.tar.gz', fingerprint: true
      }
      }
 
}