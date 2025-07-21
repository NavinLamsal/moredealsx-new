import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_URL 

let abortController = new AbortController();

const MoreClubApiClient = () => {
  const defaultOptions = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      if (session?.error) {
        // Abort all current requests
        abortController.abort();
  
        // Create a new AbortController for future requests
        abortController = new AbortController();
  
        // Sign out the user
        await signOut({ callbackUrl: '/auth/login' });
  
        // Reject the request explicitly
        return Promise.reject(new axios.Cancel(`Request cancelled due to session error: ${session.error}`));
      }
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  });

  



  return instance;
};

export default MoreClubApiClient();