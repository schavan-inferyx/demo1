pipeline {
    agent any
    
    parameters {
        choice(
            name: 'EXECUTION_TYPE',
            choices: ['ALL_TESTS', 'MODULE', 'SUBMODULE', 'TESTCASE'],
            description: 'Select execution type'
        )
        choice(
            name: 'MODULE_NAME',
            choices: ['Administration', 'Platform', 'Reports'],
            description: 'Select module (only for MODULE/SUBMODULE execution)'
        )
        choice(
            name: 'SUBMODULE_NAME',
            choices: ['Organization', 'Users', 'Settings'],
            description: 'Select submodule (only for SUBMODULE execution)'
        )
        string(
            name: 'TESTCASE_ID',
            defaultValue: '',
            description: 'Enter test case ID (e.g., TC--12.11.423) for single test execution'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Select browser for execution'
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'staging', 'prod'],
            description: 'Select environment'
        )
    }
    
    environment {
        CI = 'true'
        NODE_ENV = "${params.ENVIRONMENT}"
        BASE_URL = getBaseURL("${params.ENVIRONMENT}")
        DISPLAY = ':99'
        PLAYWRIGHT_BROWSERS_PATH = '/opt/playwright'
    }
    
    stages {
        stage('Setup') {
            steps {
                script {
                    echo "Setting up environment for ${params.EXECUTION_TYPE} execution"
                    
                    // Start virtual display for headless execution
                    sh '''
                        export DISPLAY=:99
                        Xvfb :99 -screen 0 1920x1080x24 > /dev/null 2>&1 &
                        sleep 3
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                    npx playwright install --with-deps
                '''
            }
        }
        
        stage('Execute Tests') {
            steps {
                script {
                    def testCommand = buildTestCommand()
                    echo "Executing: ${testCommand}"
                    
                    sh """
                        export DISPLAY=:99
                        mkdir -p test-results
                        mkdir -p allure-results
                        mkdir -p screenshots
                        ${testCommand}
                    """
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                script {
                    // Generate Allure report
                    sh '''
                        if [ -d "allure-results" ] && [ "$(ls -A allure-results)" ]; then
                            npx allure generate allure-results --clean -o allure-report
                        else
                            echo "No allure results found"
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Archive test results
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'screenshots/**/*', allowEmptyArchive: true
            
            // Publish test results
            publishTestResults testResultsPattern: 'test-results/junit.xml'
            
            // Publish HTML reports
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            // Publish Allure report if exists
            script {
                if (fileExists('allure-report/index.html')) {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report',
                        reportFiles: 'index.html',
                        reportName: 'Allure Report'
                    ])
                }
            }
        }
        
        failure {
            emailext (
                subject: "Test Execution Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: """
                    Test execution failed for ${params.EXECUTION_TYPE}.
                    
                    Build: ${env.BUILD_URL}
                    Console: ${env.BUILD_URL}console
                    
                    Check the attached reports for details.
                """,
                to: "${env.CHANGE_AUTHOR_EMAIL}",
                attachmentsPattern: 'test-results/**/*'
            )
        }
    }
}

def getBaseURL(environment) {
    switch(environment) {
        case 'dev':
            return 'https://dev.inferyx.com/admin/#/login'
        case 'staging':
            return 'https://staging.inferyx.com/admin/#/login'
        case 'prod':
            return 'https://prod.inferyx.com/admin/#/login'
        default:
            return 'https://dev.inferyx.com/admin/#/login'
    }
}

def buildTestCommand() {
    def baseCommand = "npx playwright test"
    def browserFlag = params.BROWSER != 'all' ? "--project=${params.BROWSER}" : ""
    
    switch(params.EXECUTION_TYPE) {
        case 'ALL_TESTS':
            return "${baseCommand} ${browserFlag}"
            
        case 'MODULE':
            return "${baseCommand} tests/${params.MODULE_NAME}/ ${browserFlag}"
            
        case 'SUBMODULE':
            return "${baseCommand} tests/${params.MODULE_NAME}/${params.SUBMODULE_NAME}/ ${browserFlag}"
            
        case 'TESTCASE':
            if (!params.TESTCASE_ID) {
                error("Test case ID is required for TESTCASE execution type")
            }
            return "${baseCommand} --grep=\"${params.TESTCASE_ID}\" ${browserFlag}"
            
        default:
            return "${baseCommand} ${browserFlag}"
    }
}
