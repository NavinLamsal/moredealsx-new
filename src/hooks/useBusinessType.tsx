'use client';
import { useAuth } from '@/providers/auth-provider';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type BusinessType = 'restaurant' | 'hotel' | 'unknown';
type UserType = 'BUSINESS' | 'NORMAL' | 'unknown';

export const useBusinessType = () => {
    const { logout, user, isLoading} = useAuth()
  
  const [businessType, setBusinessType] = useState<BusinessType>('unknown');
  const [userType, setUserType] = useState<UserType>('unknown');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return; // wait until session is loaded


    if (user) {
      // Determine business type
      if (user.crm_link?.restro_link) {
        setBusinessType('restaurant');
      } else if (user.crm_link?.hotel_link) {
        setBusinessType('hotel');
      } else {
        setBusinessType('unknown');
      }

      // Determine user type
      if (user.user_type === 'BUSINESS') {
        setUserType('BUSINESS');
      } else if (user.user_type === 'NORMAL') {
        setUserType('NORMAL');
      } else {
        setUserType('unknown');
      }
    } else {
      setBusinessType('unknown');
      setUserType('unknown');
    }

    setLoading(false);
  }, [user, isLoading]);

  return { businessType, userType, loading };
};
