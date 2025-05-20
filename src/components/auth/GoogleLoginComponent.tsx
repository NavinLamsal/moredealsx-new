import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setCookie } from '../../utils/cookie';

const GoogleLoginComponent: React.FC = () => {
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/social/google/`, {
        access_token: credential,
      });
      setCookie('accessToken', response.data.access_token, 7)

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed.');
    }
  };

  return (
    
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => alert('Google login failed. Please try again.')}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
