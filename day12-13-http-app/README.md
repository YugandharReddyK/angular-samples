# Day 12-13: HTTP Client & Async Data Handling

This application demonstrates HTTP client usage, async data handling, loading states, and error management in Angular.

## Features

### Day 12: HTTP Client Basics
- **User List**: Basic GET request with subscription
- **User Details**: Fetch single user by ID
- **Post List**: Display posts from API
- **Create User**: POST request with form

### Day 13: Async Data & Error Handling
- **Async Pipe Demo**: Using async pipe for automatic subscription management
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Comprehensive error management with retry functionality
- **Post Viewer**: Complete example with search and filtering

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

3. Navigate to `http://localhost:4200/`

## API

This app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - a free fake REST API for testing and prototyping.

## Learning Objectives

- Making HTTP requests with HttpClient
- Observable subscription patterns
- Using async pipe for automatic subscription management
- Implementing loading states
- Handling errors gracefully
- Using RxJS operators (catchError, retry, debounceTime)
- Type-safe HTTP requests with TypeScript interfaces
