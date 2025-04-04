# AI-Powered Code Compass: Open-Source Code Review Agent (Prototype for GSoC)

## Project Overview

This project, titled **AI-Powered Code Compass**, is a prototype for Google Summer of Code (GSoC). It aims to develop an AI-driven, open-source code review agent that seamlessly integrates with version control platforms and CI/CD pipelines. The agent provides automated feedback on coding style, security vulnerabilities, and adherence to best practices. By leveraging open-source static analysis tools, this project seeks to enhance the developer experience in open-source projects.

## Steps to Run the Application

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/ai-powered-code-compass.git
    cd ai-powered-code-compass
    ```

2. **Install Dependencies**:
    Ensure you have the required dependencies installed. Use the following commands:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and configure the necessary environment variables. Refer to the `.env.example` file for guidance.

4. **Run the Application**:
    Start the application using the following command:
    ```bash
    npm start
    ```

5. **Access the Application**:
    Open your browser and navigate to `http://localhost:3000` to access the application.

6. **Run Tests (Optional)**:
    To ensure everything is working correctly, run the test suite:
    ```bash
    npm test
    ```

7. **Build for Production**:
    To create a production-ready build, use:
    ```bash
    npm run build
    ```

8. **Deploy**:
    Follow the deployment guide in the documentation to deploy the application to your preferred platform.


## Objectives

The primary goal of this project is to enhance the **Keploy Playground** by introducing new functionalities, improving user experience, and expanding its capabilities. Key objectives include:

- **Expanding Language Support**: Add robust support for multiple programming languages such as Java and Python.
- **Integrating Test & Mock Support**: Provide comprehensive functionalities to generate tests and simulate mocks seamlessly.
- **Improving User Onboarding**: Redesign the user experience, especially the onboarding process, to ensure a smooth introduction to Keploy’s capabilities.

## Features

- **Automated Code Review**: Analyze code for style, security vulnerabilities, and adherence to best practices.
- **Modular Webhook System**: Enable easy integration with various platforms.
- **Dependency Vulnerability Detection**: Integrate tools like OWASP Dependency-Check or Google’s Open Source Insights (deps.dev API).
- **Exportable Results**: Export review results in JSON, Markdown, or PDF formats for offline analysis.

## Tasks

1. **Research and Analysis**:
    - Explore the architecture and workflows of various open-source code review systems.
    - Build a feature comparison matrix based on accuracy, language support, ease of integration, and performance.

2. **System Development**:
    - Build a modular webhook-based system for seamless integration with version control platforms.
    - Integrate static code analysis tools such as ESLint and GolangCI-Lint.

3. **Dependency Analysis**:
    - Use OWASP Dependency-Check or deps.dev API to detect vulnerable dependencies.

4. **Result Export**:
    - Implement functionality to export review results in multiple formats (JSON, Markdown, PDF).

## Skills Required

- **CI/CD Workflows & Automation**
- **REST APIs & Webhooks**
- **Programming Languages**: Golang, JavaScript/TypeScript, Node.js
- **Static Code Analysis Tools**: ESLint, GolangCI-Lint
- **AI/ML for Automated Code Review** (Optional but beneficial): Vertex AI

## Mentors

- Hermione
- Yash
- Gourav
- Shubham

## References

- [ESLint: Pluggable JavaScript Linter](https://eslint.org/)
- [GolangCI-Lint](https://golangci-lint.run/)

## Time Estimate

- **350 hours**

## Difficulty

## Screenshot of the Application

![Screenshot of the Application](https://postimage.me/image/Screenshot-from-2025-04-04-15-13-55.UeP96s)
