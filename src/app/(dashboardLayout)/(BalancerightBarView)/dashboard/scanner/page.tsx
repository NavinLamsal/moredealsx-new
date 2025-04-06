'use client';
import { useEffect, useState } from 'react';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useSelector } from 'react-redux';
import { AlertOctagonIcon } from 'lucide-react';

const QrReader = () => {
  const user = useSelector((state: any) => state.userReducer);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (result: IDetectedBarcode[]) => {
    let url;

    try {

       
      const parsed_json = JSON.parse(result[0].rawValue);
      setError(null);
      if (typeof parsed_json === 'object') {
        if (parsed_json?.billing) {
          const { user_name, grand_total } = parsed_json.billing;
          if (user.isAuthenticated) {
            url = `${process.env.NEXT_PUBLIC_HOST_URL}/wallet/send?user_name=${user_name}&amount=${grand_total}`;
          } else {
            url = `${process.env.NEXT_PUBLIC_HOST_URL}/login`;
          }
        } else if (parsed_json?.username) {
          const user_name = parsed_json.username;
          const bpms = parsed_json.bpms;
          if (bpms) {
            sessionStorage.setItem('bpms', bpms);
          }
          if (user.isAuthenticated) {
            url = `${process.env.NEXT_PUBLIC_HOST_URL}/wallet/send?user_name=${user_name}`;
          } else {
            url = `${process.env.NEXT_PUBLIC_HOST_URL}/login`;
          }
        }
      } else {
        if (parsed_json?.includes('referral') || parsed_json?.includes('bpms')) {
          url = parsed_json;
        }
      }

      if (url) window.location.href = url;
    } catch (error) {
      console.log('Error decoding QR', error);
      setError("Invalid QR code. Please try again.");
      // window.location.href = result;
    }
  };

  const handleError = (err: any) => {
    console.error('QR Scanner error:', err);
    setError("Camera access denied or unavailable. Please allow camera in browser settings and reload.");
    
  
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <Scanner
        onScan={(result) => handleDecode(result)}
        onError={handleError}
        constraints={{ facingMode: 'environment' }}
        allowMultiple={true}
       
        // containerStyle={{
        //   width: '100%',
        //   height: '100%',
        //   position: 'relative',
        // }}
        // videoStyle={{
        //   objectFit: 'cover',
        //   width: '100%',
        //   height: '100%',
        // }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      {error &&<p className="  max-w-sm w-full flex items-center justify-centers text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{error}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>}
        <div className="relative w-64 h-64 border-4 border-white rounded-lg">
        </div>
        {<p className=" flex items-center justify-center w-full text-center text-sm text-white p-2 mb-2  md:col-span-2 lg:col-span-3">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{"Place the Qr code inside the frame"}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>}
      </div>
    </div>
  );
};

export default QrReader;
