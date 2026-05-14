export interface Provider {
  id: string;
  userId?: string;
  name: string;
  category: string;
  location: string;
  description?: string;
  phone?: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  email?: string;
  isPremium?: boolean;
  gallery?: string[];
  testimonials?: { user: string; text: string }[];
  packages?: { title: string; price: number; description: string }[];
}

export interface Space {
  id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Route {
  id: string;
  title: string;
  imageUrl: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'couple' | 'vendor' | 'admin';
  displayName?: string;
  photoURL?: string;
}

export interface ContractedService {
  id: string;
  providerId: string;
  providerName: string;
  category: string;
  cost: number;
  date: any;
}

export interface Guest {
  id: string;
  name: string;
  status: 'confirmed' | 'pending' | 'declined';
  side: 'bride' | 'groom' | 'mutual';
}

export interface Wedding {
  id: string;
  ownerId: string;
  date?: string;
  location?: string;
  budget: number;
  spent: number;
  status: 'planning' | 'finalized' | 'completed';
  religion?: string;
  weddingColor?: string;
  contractedServices?: ContractedService[];
  guests?: Guest[];
  completedMilestones?: number[];
  updatedAt?: any;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: any;
  read: boolean;
  relatedProviderId?: string;
}
