// "use client";
// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';


// type AlertData = {
//     expiry_date:null
//     invitation_id:string
//     invite_date:string
//     restaurant_id:string
//     restaurant_name:string
//     status:string
// };

// const fetchCrmAlert = async (): Promise<AlertData[] | null> => {
//   const { data } = await MoreClubApiClient.get('crm/restro/staff-invitations/check/');
//   return data.data || [];
// };

// // Response to invitation
// const respondToInvitation = async ({
//     invitation_id,
//     action,
//   }: {
//     invitation_id: string;
//     action: 'accept' | 'reject';
//   }) => {
//     return MoreClubApiClient.post(
//       `crm/restro/invitation/response/${invitation_id}/`,
//       { action },
//     );
//   };
  
//   const CrmAlert = () => {
//     const queryClient = useQueryClient();
  
//     const { data: alertData, isLoading } = useQuery({
//       queryKey: ['crm-alert'],
//       queryFn: fetchCrmAlert,
//       staleTime: 1000 * 60,
//     });
  
//     const mutation = useMutation({
//       mutationFn: respondToInvitation,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ['crm-alert'] });
//       },
//     });
  
//   if (isLoading) return <div className="p-4">Loading alert...</div>;
//   console.log(alertData);
//   if (!alertData) return null;

//   return (
//     <>
//     {alertData.map((alert) => (
//          <div className="w-full bg-yellow-100 border border-yellow-300 rounded-xl shadow p-4 flex flex-col gap-4" key={alert.invitation_id}>
//          <div className="text-lg font-semibold text-yellow-800">{"Restaurant invitation"}</div>
//          <div className="text-sm text-yellow-700">You have been invited to join <strong className='uppercase'>{alert?.restaurant_name}</strong></div>
//          <div className="flex gap-4 justify-end">
//             <button
//               onClick={() =>
//                 mutation.mutate({ invitation_id: alert.invitation_id, action: 'reject' })
//               }
//               className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
//               disabled={mutation.isPending}
//             >
//               {mutation.isPending ? 'Processing...' : 'Reject'}
//             </button>
//             <button
//               onClick={() =>
//                 mutation.mutate({ invitation_id: alert.invitation_id, action: 'accept' })
//               }
//               className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
//               disabled={mutation.isPending}
//             >
//               {mutation.isPending ? 'Processing...' : 'Accept'}
//             </button>
//           </div>
//        </div>
//     ))}
   
//     </>
    
//   );
// };

// export default CrmAlert;


'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import MoreClubApiClient from '@/lib/axios/moreclub/MoreClubApiClient';
import { showToast } from '@/lib/utilities/toastService';

type AlertData = {
  expiry_date: null;
  invitation_id: string;
  invite_date: string;
  restaurant_id: string;
  restaurant_name: string;
  status: string;
};

// Fetch invitations
const fetchCrmAlert = async (): Promise<AlertData[]> => {
  const { data } = await MoreClubApiClient.get('crm/restro/staff-invitations/check/');
  return data.data || [];
};

// Respond to invitation
const respondToInvitation = async ({
  invitation_id,
  action,
}: {
  invitation_id: string;
  action: 'accept' | 'reject';
}) => {
  return MoreClubApiClient.post(`crm/restro/invitation/response/${invitation_id}/`, {
    action,
  });
};

const CrmAlert = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: respondToInvitation,
    onSuccess: async (_res, variables) => {
      showToast('Invitation ' + variables.action, 'success');  
      queryClient.invalidateQueries({ queryKey: ['crm-alert'] });
    },
    onError: () => {
      showToast("Error processing invitation", "error");
    },
  });

  const { data: alertData, isLoading } = useQuery({
    queryKey: ['crm-alert'],
    queryFn: fetchCrmAlert,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div className="p-4">Loading alert...</div>;
  if (!alertData || alertData.length === 0) return null;

  if(alertData
    .filter((alert) => alert.status === 'pending')
    .length === 0) return null


  return (
    <>
      {alertData
  .filter((alert) => alert.status === 'pending')
  .map((alert) => (
    <div
      key={alert.invitation_id}
      className="w-full bg-yellow-100 border border-yellow-300 rounded-xl shadow p-4 flex flex-col gap-4 mb-4"
    >
      <div className="text-lg font-semibold text-yellow-800">
        Restaurant Invitation
      </div>
      <div className="text-sm text-yellow-700">
        You have been invited to join{' '}
        <strong className="uppercase">{alert.restaurant_name}</strong>
      </div>
      <div className="flex gap-4 justify-end">
        <button
          onClick={() =>
            mutation.mutate({ invitation_id: alert.invitation_id, action: 'reject' })
          }
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Processing...' : 'Reject'}
        </button>
        <button
          onClick={() =>
            mutation.mutate({ invitation_id: alert.invitation_id, action: 'accept' })
          }
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Processing...' : 'Accept'}
        </button>
      </div>
    </div>
))}

    </>
  );
};

export default CrmAlert;
