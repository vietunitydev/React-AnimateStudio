import {User} from "@/types/user.types.ts";

export interface ProjectData {
    id?: string;
    title?: string;
    texts: string[];
    imageUrls: string[];
    musicUrl?: string;
    theme: string;
}

export interface FallingItem {
    id: number;
    type: 'heart' | 'text' | 'image';
    content: string;
    x: number;
    y: number;
    speed: number;
    rotation: number;
    rotationSpeed: number;
    size: number;
    lastFrameTime: number;
    targetY: number;
}

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    loginWithGoogle: () => void
    logout: () => void
    checkAuth: () => Promise<void>
}
