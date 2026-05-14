import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from 'firebase/auth';
import { auth, db, handleFirestoreError } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (role: 'couple' | 'vendor' | 'admin', isDirect?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const dbProfile = userDoc.exists() ? (userDoc.data() as UserProfile) : null;
          
          // Check for role override in localStorage
          const savedRole = localStorage.getItem('auth_role_override');
          
          if (savedRole && dbProfile) {
             setUserProfile({ ...dbProfile, role: savedRole as any });
          } else if (dbProfile) {
             setUserProfile(dbProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
        localStorage.removeItem('auth_role_override');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (role: 'couple' | 'vendor' | 'admin', isDirect: boolean = false) => {
    try {
      let user;
      if (isDirect) {
        // Sign in anonymously for direct entry
        const result = await signInAnonymously(auth);
        user = result.user;
      } else {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        user = result.user;
      }
      
      const userRef = doc(db, 'users', user.uid);
      
      // The passed 'role' ALWAYS takes priority to avoid inverted logic
      const finalRole = role;
      
      const updatedProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        role: finalRole,
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
      };

      // PERSIST ROLE IN LOCAL STORAGE TO BYPASS DB LATENCY
      localStorage.setItem('auth_role_override', finalRole);

      // Force save to database
      await setDoc(userRef, updatedProfile, { merge: true });
      
      // Force update local state IMMEDIATELY
      setUserProfile(updatedProfile);
      
      // Force navigation based on the FINAL role
      const targetPath = finalRole === 'admin' ? '/admin' : finalRole === 'vendor' ? '/panel-proveedor' : '/mi-boda';
      
      // DELAYED NAVIGATION TO ENSURE STATE IS SET
      setTimeout(() => {
        if (isDirect) {
          console.log("Redirecting to admin directly...");
          window.location.assign(targetPath);
        } else {
          navigate(targetPath);
        }
      }, 100);
      
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
