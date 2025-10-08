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

export interface SelectOption {
    label: string
    value: string | number
}

export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    role: 'admin' | 'user'
    createdAt?: string
    updatedAt?: string
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
}

