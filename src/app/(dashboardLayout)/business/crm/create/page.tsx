import CRMDetail from '@/components/moreclub/Crm/CRMDetail';
import { Suspense } from 'react';


const CreateCRMPage = async() => {

    
 return (<div className='px-2 sm:px-4 md:px-6'>
      <Suspense fallback={<div>Loading...</div>}>
      <CRMDetail />
      </Suspense>
    </div>
  )
}

export default CreateCRMPage
