# Contributing to Campus Connect

Thank you for your interest in contributing to Campus Connect! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/campus-connect.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add your meaningful commit message"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js (LTS version)
- npm or yarn

### Installation

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   # or for development with auto-reload
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Code Style Guidelines

- Use consistent indentation (2 spaces)
- Follow existing code style and patterns
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Commit Message Guidelines

- Use clear, descriptive commit messages
- Start with a capital letter
- Use present tense ("Add feature" not "Added feature")
- Reference issues if applicable: "Fix #123: Description"

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if needed
3. Test your changes thoroughly
4. Create a clear PR description explaining:
   - What changes were made
   - Why they were made
   - How to test the changes

## Reporting Issues

When reporting issues, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information (if applicable)
- Screenshots (if applicable)

## Questions?

Feel free to open an issue for any questions or clarifications.
