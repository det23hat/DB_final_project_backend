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
						
						// use local registry
						docker.withRegistry("https://hub.docker.com",SERVER_CREDENTIALS) {
							 customImage = docker.build("109753135/testweb:latest")
							 customImage.push('latest')
						}  
						currentBuild.result = 'SUCCESS'
					}
					catch(err){
						currentBuild.result = 'FAILURE'

					}
				}
            }
        }
        stage('Test') {
            steps {
                echo 'test Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'test Deploying....'
            }
        }
    }
}
