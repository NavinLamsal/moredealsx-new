import CRMDetail from '@/components/moreclub/Crm/CRMDetail';
import { Suspense } from 'react';


const CreateCRMPage = async() => {
  // const session = await auth();

  // if (!session) {
  //   return (
  //     <div className='px-2 sm:px-4 md:px-6'>
  //       <p>Unauthorized</p>
  //     </div>
  //   );
  // }

  // if(!session.user.userDetails.crm_link  || session.user.userDetails.crm_link.length === 0){
    return (<div className='px-2 sm:px-4 md:px-6'>
      <Suspense fallback={<div>Loading...</div>}>
      <CRMDetail />
      </Suspense>
    </div>
  )
  // }else{
    // return (
    //   <div className='px-2 sm:px-4 md:px-6'>        
    //     <CRMDetailList />
    //   </div>
    // )

  // }
}

export default CreateCRMPage
