pipeline {
    agent any
    environment{
        SERVER_CREDENTIALS = credentials('dockerhub-registry')
    }
    stages {
        stage('Build docker image') {
            steps {
                script { 
					try{

                       customImage = docker.build("109753135/testweb:latest")
					   currentBuild.result = 'SUCCESS'

					}
					catch(err){
						currentBuild.result = 'FAILURE'

					}
				}
            }
        }
        stage('Deploy Image') {
            steps{
                script {
                docker.withRegistry( '', SERVER_CREDENTIALS ) {
                    customImage.push('latest')
                    }
                }
            }
        }
    }
}
