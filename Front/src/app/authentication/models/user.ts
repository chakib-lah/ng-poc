/* Defines the user entity */
export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles?: string[];
}