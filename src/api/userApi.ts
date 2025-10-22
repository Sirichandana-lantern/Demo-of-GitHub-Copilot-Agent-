/**
 * Mock API for creating users
 */
export interface User {
  email: string;
  password: string;
  name: string;
}

/**
 * Creates a mock user for testing
 * @returns A user object with email, password, and name
 */
export function createUser(): User {
  const timestamp = Date.now();
  return {
    email: `testuser${timestamp}@example.com`,
    password: 'SecurePass123!',
    name: 'Test User'
  };
}
