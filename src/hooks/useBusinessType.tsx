'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type BusinessType = 'restaurant' | 'hotel' | 'unknown';
type UserType = 'BUSINESS' | 'NORMAL' | 'unknown';

export const useBusinessType = () => {
  const { data: session, status } = useSession(); // track loading state via status
  const [businessType, setBusinessType] = useState<BusinessType>('unknown');
  const [userType, setUserType] = useState<UserType>('unknown');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // wait until session is loaded

    const userDetails = session?.user?.userDetails;

    if (userDetails) {
      // Determine business type
      if (userDetails.crm_link?.restro_link) {
        setBusinessType('restaurant');
      } else if (userDetails.crm_link?.hotel_link) {
        setBusinessType('hotel');
      } else {
        setBusinessType('unknown');
      }

      // Determine user type
      if (userDetails.user_type === 'BUSINESS') {
        setUserType('BUSINESS');
      } else if (userDetails.user_type === 'NORMAL') {
        setUserType('NORMAL');
      } else {
        setUserType('unknown');
      }
    } else {
      setBusinessType('unknown');
      setUserType('unknown');
    }

    setLoading(false);
  }, [session, status]);

  return { businessType, userType, loading };
};
