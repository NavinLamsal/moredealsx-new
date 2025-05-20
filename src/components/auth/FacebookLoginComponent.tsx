import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import axios from 'axios';
import { FaFacebook } from 'react-icons/fa';
import { setCookie } from '../../utils/cookie';

const FacebookLoginComponent: React.FC = () => {
  const handleFacebookLoginSuccess = async (response: any) => {
    console.log('Facebook login response:', response);

    if (response.accessToken) {
      try {
        // Send the Facebook access token to your Django backend
        const backendResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/social/facebook/`, {
          access_token: response.accessToken,
        });

        // Store the JWT access token in cookies
        setCookie('accessToken', backendResponse.data.access_token, 7)

        // Redirect to the dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Error during backend authentication:', error);
        alert('Login failed. Please try again.');
      }
    } else {
      alert('Failed to retrieve Facebook access token.');
    }
  };

  return (
    <div className='flex flex-1'>
      <FacebookLogin
        appId="3506115189691032"
        style={{
          backgroundColor: '#4267b2',
          color: '#fff',
          fontSize: '16px',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          width: '385px',
          height: '40px',
        }}
        onSuccess={handleFacebookLoginSuccess}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          console.log('Get Profile Success!', response);
        }}
      >
        <FaFacebook size={20} style={{ marginRight: '10px' }} />
        <span style={{ flexGrow: 1, textAlign: 'center' }}>Login with Facebook</span>
      </FacebookLogin>
    </div>
  );
};

export default FacebookLoginComponent;
