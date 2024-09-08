// src/lib/auth.ts

import PocketBase, { type RecordAuthResponse} from 'pocketbase';

// PocketBase Client-Instanz
const pb = new PocketBase('http://localhost:8090');  // Passe die URL zu deinem PocketBase-Backend an

// Login Funktion
export async function login(email: string, password: string): Promise<RecordAuthResponse> {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        return authData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Logout Funktion
export function logout(): void {
    pb.authStore.clear();
}

// Funktion, um den aktuellen Benutzer abzurufen
export function getCurrentUser() {
    return pb.authStore.model;
}

// Funktion, um zu überprüfen, ob der Benutzer authentifiziert ist
export function isAuthenticated(): boolean {
    return pb.authStore.isValid;
}
