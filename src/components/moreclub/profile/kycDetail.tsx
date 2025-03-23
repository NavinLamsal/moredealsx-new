import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { KYCProps } from '@/lib/type/moreclub/User';
import { AvatarImage } from '@radix-ui/react-avatar';
import { AlertOctagonIcon, CalendarIcon, Edit2, MailIcon, Paperclip, PhoneIcon, PinIcon, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const KycDetail = ({ kycDetail }: { kycDetail: KYCProps }) => {


  return (
    <div>
      <ProfileCard kycDetail={kycDetail} />
    </div>
  )
}

export default KycDetail


const ProfileCard = ({ kycDetail }: { kycDetail: KYCProps }) => {


  return (
    <div className='flex flex-col gap-10'>
      <Card className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-4  max-w-4xl ">
        {kycDetail.is_verified === false &&
          <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
            <AlertOctagonIcon className="mr-2 h-4 w-4" />&nbsp;{kycDetail.is_not_verified === true ? kycDetail.note : "Your KYC submission is under verification. We will notify you once the process is complete."}&nbsp;<AlertOctagonIcon className="ml-2 h-4 w-4 " />
          </p>
        }

        {/* Cover Image */}
        <div className='grid items-center justify-center gap-4'>
          <Avatar className='w-48 h-48 rounded-full border-4 border-white shadow-md mx-auto'>
            <AvatarImage src={kycDetail.display_picture} alt="Profile" className='w-48 h-48  shadow-md' />
            <AvatarFallback className='w-48 h-48  uppercase text-4xl font-bold bg-white text-black'>{kycDetail.first_name.charAt(0)}&nbsp;{kycDetail?.last_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Link href={"/settings/kyc/update?tab=General"}>
            <Button>
              Update
            </Button>

          </Link>
        </div>



        {/* Personal Info */}
        <div className="px-6 pb-4 lg:col-span-2 ">
          <div className='flex gap-2'>

            <User className='mr-2' fill='currentColor' /> <Heading title="Personal Information" />
          </div>
          <div className="text-sm md:text-base lg:text-lg text-gray-600 space-y-2">
            <p className='flex text-balance'><User className='mr-2' fill='currentColor' /> <span className="font-semibold"> Full Name&nbsp;&nbsp;:</span> &nbsp;&nbsp;{kycDetail?.first_name}&nbsp;{kycDetail?.last_name}</p>

            <p className='flex text-balance items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.25 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4m1.759 5.103l.086-1.47l.421 2.297a1 1 0 1 0 1.967-.36l-.537-2.93A2 2 0 0 0 9.25 8.017V8h-4l.002.018A2 2 0 0 0 3.554 9.64l-.538 2.93a1 1 0 1 0 1.968.361l.42-2.297l.087 1.47a1 1 0 0 1-.025.29L4.25 17.5s.817.5 3 .5s3-.5 3-.5l-1.216-5.107a1 1 0 0 1-.025-.29M4.75 20.14v-1.42l.055.014c.458.12 1.126.234 2.047.26l-.418 1.393a.86.86 0 0 1-1.684-.247m2.898-1.146l.418 1.393a.86.86 0 0 0 1.684-.247v-1.42l-.055.014c-.459.12-1.126.234-2.047.26M18.5 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0M12 10a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v3.5a1 1 0 1 1-2 0V10h-.25v10.071a.929.929 0 0 1-1.856.06L16.564 15h-.128l-.33 5.13a.929.929 0 0 1-1.856-.059V10H14v3.5a1 1 0 1 1-2 0z" />
              </svg>
              <span className="font-semibold">Gender&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.gender}</p>

            <p className='flex text-balance gap-2 items-center '> <CalendarIcon size={16} className='text-xs mr-1' /> <span className="font-semibold">Date of Birth&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.date_of_birth}</p>

            <p className='flex text-balance gap-2 items-center'><MailIcon size={16} className='text-xs mr-1' /><span className="font-semibold">  Secondary Email&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.secondary_email}</p>

            <p className='flex text-balance gap-2 items-start'><PhoneIcon size={16} className='text-xs mr-1' /> <span className="font-semibold">Secondary Phone Number&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.secondary_phone_number}</p>

            {/* <p className='flex text-balance'><span className="font-semibold">Date Joined&nbsp;&nbsp;:</span> &nbsp;&nbsp;{moment(kycDetail?.date_joined).format('MMM DD, YYYY')}</p> */}
            <p className='flex text-balance items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.18 15.296c-1.258.738-4.555 2.243-2.547 4.126c.982.92 2.074 1.578 3.448 1.578h7.838c1.374 0 2.467-.658 3.447-1.578c2.009-1.883-1.288-3.389-2.546-4.126a9.61 9.61 0 0 0-9.64 0M14 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2.761-3.724c.805-.457 1.507-.273 1.929.02c.173.12.26.181.31.181s.137-.06.31-.18c.422-.294 1.124-.478 1.929-.02c1.056.599 1.294 2.577-1.14 4.246C19.633 7.841 19.401 8 19 8s-.634-.159-1.098-.477c-2.436-1.669-2.197-3.647-1.14-4.247" color="currentColor" />
            </svg><span className="font-semibold">Relationship Status&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.marital_status} </p>
            <p className='flex text-balance items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7.5 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M6 7h3a2 2 0 0 1 2 2v5.5H9.5V22h-4v-7.5H4V9a2 2 0 0 1 2-2m8.5 5a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-1 3h6v4H18v3h-3v-3h-1.5z" />
            </svg><span className="font-semibold">Father name&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.father_name} </p>
            <p className='flex text-balance items-center'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7.5 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M6 22v-6H3l2.6-7.6c.3-.8 1-1.4 1.9-1.4s1.7.6 1.9 1.4L12 16H9v6zm8.5-10a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-1 3h6v4H18v3h-3v-3h-1.5z" />
            </svg><span className="font-semibold">Mother name&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.mother_name} </p>
            {kycDetail.marital_status === "married" &&
              <p className='flex text-balance items-center'>

                <span className="font-semibold">Spouse name&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.spouse_name} </p>}




            <p className='flex text-balance items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 15c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4M8 9a4 4 0 0 0 4 4a4 4 0 0 0 4-4m-4.5-7c-.3 0-.5.21-.5.5v3h-1V3s-2.25.86-2.25 3.75c0 0-.75.14-.75 1.25h10c-.05-1.11-.75-1.25-.75-1.25C16.25 3.86 14 3 14 3v2.5h-1v-3c0-.29-.19-.5-.5-.5z" />
            </svg><span className="font-semibold">Occupation&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.occupation} </p>
          </div>

          <div className='flex items-center gap-2 mt-4'>

            <div className='flex items-center gap-2 mb-2'>

              <div className='flex gap-2'>

                <PinIcon className='mr-2' fill='currentColor' />
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-xl  font-semibold text-gray-800 dark:text-gray-100">Address</h2>

                </div>

              </div>
              <Link href={"/settings/kyc/update?tab=Address"}>
                <Button size={"icon"} variant={"outline"}><Edit2 /></Button>
              </Link>
            </div>

          </div>
          <div className="text-sm md:text-base lg:text-lg text-gray-600 space-y-2">
            {/* <p className='flex text-balance'><span className="font-semibold">Country&nbsp;&nbsp;:</span> &nbsp;&nbsp;{kycDetail?.state}</p> */}
            <p className='flex text-balance items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
              <path fill="currentColor" d="M58.25 19.813v-4.688a1.874 1.874 0 0 0-1.875-1.875h-2.813V2.938a.937.937 0 1 0-1.875 0V9.07a5.6 5.6 0 0 0-5.474-1.17a6.57 6.57 0 0 0-4.839-2.149A6.52 6.52 0 0 0 35.45 9.51a4.694 4.694 0 0 0-4.389 4.678a4.693 4.693 0 0 0 4.688 4.688H47v.938a3.76 3.76 0 0 0-3.75 3.75v6.563h-7.5c-1.664 0-2.813.829-2.813 2.567v-10.71c0-1.046-.597-2.505-1.326-3.243l-6.723-6.812a1.856 1.856 0 0 0-2.57-.067a7.45 7.45 0 0 0-4.381-1.425a7.52 7.52 0 0 0-5.132 2.039a6.3 6.3 0 0 0-1.431-.164a6.59 6.59 0 0 0-6.016 3.942A4.7 4.7 0 0 0 2 20.75a4.693 4.693 0 0 0 4.688 4.688h7.5v8.438H5.75A3.76 3.76 0 0 0 2 37.626V62h32.813V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H39.5V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H62V23.563a3.76 3.76 0 0 0-3.75-3.75M10.906 56.375a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938H7.156a.94.94 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zM6.688 23.563a2.814 2.814 0 0 1 0-5.626h.096a4.686 4.686 0 0 1 4.592-3.75c.72 0 1.394.176 2.003.465a5.61 5.61 0 0 1 4.56-2.34c1.121 0 2.161.331 3.038.896l-5.462 5.533c-.729.738-1.326 2.197-1.326 3.243v1.578H6.688zm23.437 32.812a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V32a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zm0-7.5a.94.94 0 0 1-.938.938h-11.25a.94.94 0 0 1-.938-.938V24.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938zM35.75 17a2.814 2.814 0 0 1 0-5.626c.359 0 .697.073 1.013.196c.356-2.234 2.279-3.946 4.612-3.946a4.68 4.68 0 0 1 4.235 2.706a3.7 3.7 0 0 1 2.328-.83a3.75 3.75 0 0 1 3.75 3.75h-2.813A1.876 1.876 0 0 0 47 15.125V17zm15.469 41.25a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813A.94.94 0 0 1 46.53 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm7.5 32.812a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.563a.94.94 0 0 1-.938.938h-2.813A.94.94 0 0 1 54.03 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938zm0-6.562a.94.94 0 0 1-.938.938h-2.813a.94.94 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938z" />
            </svg><span className="font-semibold">City&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.city}</p>
            <p className='flex text-balance items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path fill="currentColor" fill-rule="evenodd" d="M6.25 0H3.5a.5.5 0 0 0-.487.388l-3 13A.5.5 0 0 0 .5 14h5.75v-2.154a.75.75 0 0 1 1.5 0V14h5.75a.5.5 0 0 0 .487-.612l-3-13A.5.5 0 0 0 10.5 0H7.75v2.154a.75.75 0 0 1-1.5 0zM7 5.173a.75.75 0 0 1 .75.75v2.154a.75.75 0 0 1-1.5 0V5.923a.75.75 0 0 1 .75-.75" clip-rule="evenodd" />
              </svg><span className="font-semibold">Street&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.street}</p>
            <p className='flex text-balance items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3.77 21q-.31 0-.54-.23T3 20.23v-6.46q0-.31.23-.54t.54-.23H7V8q0-2.083 1.458-3.542Q9.917 3 12 3h4q2.083 0 3.542 1.458Q21 5.917 21 8v12.5q0 .213-.144.356t-.357.144t-.356-.144T20 20.5V18h-5v2.23q0 .31-.23.54t-.54.23zM9 16.85l-4.336-2.47q-.222-.128-.443.004q-.221.133-.221.383q0 .118.059.222t.162.159l4.375 2.504q.18.106.401.106q.22 0 .407-.106l4.375-2.504q.103-.057.162-.164t.059-.222q0-.248-.221-.379t-.442-.002zm6 .15h5V8q0-1.65-1.175-2.825T16 4h-4q-1.65 0-2.825 1.175T8 8v5h6.23q.31 0 .54.23t.23.54zm-4-7.5q-.213 0-.356-.144t-.144-.357t.144-.356T11 8.5h6q.213 0 .356.144t.144.357t-.144.356T17 9.5z" />
              </svg>
              <span className="font-semibold">Zip code&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.zip_code}</p>
          </div>
        </div>



      </Card>

      <div className="w-full max-w-4xl overflow-hidden ">
        {/* Address */}
        <Card className="px-6 py-4 shadow-lg rounded-xl">


          <div className='flex w-full justify-between'>
            <div className='flex gap-2'>
              <Paperclip className='mr-2' /> <Heading title="Documents" />
            </div>

            {!kycDetail?.is_verified &&

              <Link href="/settings/kyc/update?tab=Documents">
                <Button>Update Document</Button>
              </Link>
            }
          </div>
          <div className="text-sm md:text-base lg:text-lg text-gray-600 space-y-2">
            <p className='flex text-balance items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm.75 9.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5zm0 4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5z" clip-rule="evenodd" />
                <path fill="currentColor" d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z" />
              </svg>
              <span className="font-semibold">Document Type&nbsp;&nbsp;:</span> &nbsp;&nbsp;{kycDetail.document_type.replace("_", " ").charAt(0).toUpperCase() + kycDetail.document_type.replace("_", " ").slice(1)}</p>


            <p className='flex text-balance items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.744 1.996a2.25 2.25 0 0 1 2.245 2.096l.005.154v15.498a2.25 2.25 0 0 1-2.096 2.245l-.154.005h-11.5A2.25 2.25 0 0 1 4 19.898l-.005-.154V4.246A2.25 2.25 0 0 1 6.09 2.001l.154-.005zm0 1.5h-11.5a.75.75 0 0 0-.743.648l-.007.102v15.498c0 .38.282.694.648.743l.102.007h11.5a.75.75 0 0 0 .743-.648l.007-.102V4.246a.75.75 0 0 0-.648-.743zM13.018 16.02a.75.75 0 0 1-.623-.858l.104-.66h-1.481l-.142.895a.75.75 0 1 1-1.481-.235l.104-.66h-.75a.75.75 0 0 1 0-1.5h.988l.237-1.5H9.25a.75.75 0 0 1 0-1.5h.963l.2-1.26a.75.75 0 0 1 1.48.235L11.73 10h1.482l.2-1.259a.75.75 0 0 1 1.48.235L14.73 10h.52a.75.75 0 0 1 0 1.5h-.757l-.238 1.5h.494a.75.75 0 0 1 0 1.5h-.731l-.142.896a.75.75 0 0 1-.858.623M11.493 11.5l-.238 1.5h1.482l.237-1.5z" />
              </svg>

              <span className="font-semibold">{kycDetail.document_type === " "
                ? "Document"
                : kycDetail.document_type.replace("_", " ").charAt(0).toUpperCase() + kycDetail.document_type.replace("_", " ").slice(1)
              } ID&nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.document_id}</p>


            <p className='flex text-balance items-center gap-2'><CalendarIcon size={16} className='text-xs mr-1' /><span className="font-semibold">{kycDetail.document_type === " "
              ? "Document"
              : kycDetail.document_type.replace("_", " ").charAt(0).toUpperCase() + kycDetail.document_type.replace("_", " ").slice(1)
            } Issue Date &nbsp;&nbsp;:</span>&nbsp;&nbsp;{kycDetail?.issue_date}</p>
          </div>

          <div className='flex items-center flex-wrap gap-4 justify-items-start mt-4'>

            <Image src={kycDetail?.document_front} alt="document" width={1000} height={1000}
              className='h-40 w-auto  border p-3 border-gray-800 dark:border-gray-100 rounded-md'
            />
            {kycDetail?.document_back && <Image src={kycDetail?.document_back} alt="document" width={1000} height={1000}
              className='h-40 w-auto border p-3  border-gray-800 dark:border-gray-100 rounded-md'
            />}

          </div>
        </Card>
      </div>
    </div>
  );
};



