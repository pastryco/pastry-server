// src/stores/authStore.ts

import { writable } from 'svelte/store';
import { login, logout, getCurrentUser, isAuthenticated } from '../lib/auth';

// Authentifizierungsstatus-Typen
interface AuthStoreState {
    user: Record<string, any> | null;
    isAuthenticated: boolean;
}

// Initialer Zustand
const initialState: AuthStoreState = {
    user: getCurrentUser(),
    isAuthenticated: isAuthenticated(),
};

// Erstelle den Svelte Store
export const authStore = writable<AuthStoreState>(initialState);

// Funktion, um den Benutzer einzuloggen und den Store zu aktualisieren
export async function handleLogin(email: string, password: string): Promise<void> {
    try {
        const authData = await login(email, password);
        authStore.set({
            user: authData.record,
            isAuthenticated: true,
        });
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

// Funktion, um den Benutzer auszuloggen und den Store zurückzusetzen
export function handleLogout(): void {
    logout();
    authStore.set({
        user: null,
        isAuthenticated: false,
    });
}
