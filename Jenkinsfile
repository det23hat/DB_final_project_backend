pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh """
                    sudo docker build -t testweb .
                """
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
