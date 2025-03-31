"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import Heading from '@/components/ui/heading';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserPhotoUpload } from '@/components/form/morefood/UserphotoUpload';
import UserUploadlist from './userUploadList';
import RestaurantGallery from './restaurantGallery';
import { Tabs } from '@radix-ui/react-tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const PhotoGallery = ({slug}:{slug:string}) => {
  const tablist = [
    {
      id: "3",
      value: "restaurant",
      name: "Restaurant Gallery",
      content: <RestaurantGallery slug={slug} />,
    },
    {
      id: "1",
      value: "user",
      name: "User Uploads",
      content: <UserUploadlist slug={slug} />,
    },
  ]


  
  const [upload, setUpload] = useState(false);


    // Check for small screen
    const isSmallScreen = useIsMobile();

  
    const handleSave = () => {
      // Handle save logic here (e.g., make API call to save the updated review)
      setUpload(false); // Close the modal or bottom sheet
    };
  
    const handleCancel = () => {    
      setUpload(false); // Close the modal or bottom sheet
    };

  return (
    <>
    <Card className="mt-4">
        <CardHeader className='flex justify-between py-2'>
            <CardTitle className='hidden'>Gallery
            </CardTitle>
            <div className='flex items-center justify-between gap-4'>
              <Heading title='Gallery'/>
              <Button size={"sm"} variant={"morefoodPrimary"} onClick={() => setUpload(true)}>Upload Image</Button>
            </div>
            
        </CardHeader>
        <CardContent className='py-2'>

        <Tabs defaultValue={"restaurant"} className="mx-auto w-full max-w-5xl bg-card">
      {/* Tab List */}
      <TabsList className=" w-full flex items-center justify-start border-b border-muted-foreground dark:border-gray-700 bg-inherit rounded-none overflow-x-auto hide-scroll-bar">
      {tablist.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.value}
            className="relative px-4 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-morefoodPrimary transition-all duration-300 
              data-[state=active]:border-b-4 data-[state=active]:shadow-none data-[state=active]:bg-transparent  data-[state=active]:text-morefoodPrimary rounded-none data-[state=active]:border-morefoodPrimary data-[state=active]:dark:bg-transparent data-[state=active]:dark:text-white"
          >
            {item.name}
            {/* Active Tab Underline */}
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-transparent transition-all duration-300 data-[state=active]:bg-morefoodPrimary"></span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab Content */}
      {tablist.map((item) => (
        <TabsContent key={item.id} value={item.value} className="py-2">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
        </CardContent>
    </Card>
    
    {/* Modal (Dialog for large screens) */}
    {upload && !isSmallScreen && (
        <Dialog open={upload} onOpenChange={()=>setUpload(false)} >
            <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl md:max-h-[60%] lg:max-h-[75%] overflow-y-scroll hide-scroll-bar ">
                <Heading title="Upload Photos" />
          <DialogDescription className='mt-0 pt-0'> 
          Share Your Memories! 📸
          Upload photos of your experience and share them with the restaurant. Your images will be visible only after admin approval. ✅🔒
          </DialogDescription>
               <UserPhotoUpload onSubmit={handleSave} onCancel={handleCancel} slug={slug} />
            </DialogContent>
        </Dialog>
      )}

      {/* Bottom Sheet for Small Screens */}
      {upload && isSmallScreen && (
        <Sheet open={upload} onOpenChange={()=>setUpload(false)}>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll p-2">
            <SheetHeader>
                <SheetTitle>Upload Photos</SheetTitle>
                <SheetDescription className='my-3'>Share Your Memories! 📸
                Upload photos of your experience and share them with the restaurant. Your images will be visible only after admin approval. ✅🔒</SheetDescription>
              </SheetHeader>
                <SheetDescription className='my-4'>
                <UserPhotoUpload onSubmit={handleSave} onCancel={handleCancel} slug={slug} />
            </SheetDescription>
        </SheetContent>
        </Sheet>
      )}
    </>

  );
};

export default PhotoGallery;
