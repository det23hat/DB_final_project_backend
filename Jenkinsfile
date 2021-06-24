pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh """
                    docker build -t myweb .
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
