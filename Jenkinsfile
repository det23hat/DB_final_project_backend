pipeline {
    agent any
    tools{
        dockerTool 'myDocker'
    }
    stages {
        stage('Build docker image') {
            steps {
                script { 
					try{
						
						// use local registry
						docker.withRegistry("https://hub.docker.com",'e39fc1e7-7edc-4c9f-b7a9-628f4bf2e295' ) {
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
