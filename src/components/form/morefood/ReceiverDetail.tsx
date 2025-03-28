import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setFieldError, updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { CheckoutFormTypes } from '@/lib/type/morefood/restaurant';
import { validateRequired } from '@/lib/validation/common';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ReceiverDetail = ({onSubmit}:{onSubmit: () => void}) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.delivery);
    const {receiverName , mobileNumber} = useSelector((state: RootState) => state.delivery);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>(formData.errors || {});


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        dispatch(updateFormData(updatedFormData));
        setErrors({ ...errors, [name]: "" });
        dispatch(setFieldError({ field: name as keyof CheckoutFormTypes, message: "" }));
      };

        const validate = async (fieldValues: Partial<{
          receiverName: string;
          mobileNumber: string;
              
          }> = { receiverName, mobileNumber }) => {
      
              // Explicitly define tempErrors as a dynamic object
              const tempErrors: Record<string, string> = { ...errors };
      
              if ("receiverName" in fieldValues) {
      
                  tempErrors.firstName = validateRequired(fieldValues.receiverName || "", "Receiver Name");
              }
      
              if ("mobileNumber" in fieldValues) {
                  tempErrors.mobileNumber = validateRequired(fieldValues.mobileNumber || "", "Mobile Number");
              }
      
              setErrors(tempErrors);
              return Object.values(tempErrors).every((error) => !error);
          };

      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!(await validate())) {
            return;
        }
        onSubmit();
      };


  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="receiverName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            <p>
              <span className="text-red-500">*</span> Receiver&apos;s Name
            </p>
          </label>
          <Input
            type="text"
            name="receiverName"
            id="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            className={`  ${errors.receiverName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}  `}
          />
          {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName}</p>}
        </div>
        <div>
          <label
            htmlFor="mobileNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            <p>
              <span className="text-red-500">*</span> Receiver&apos;s Mobile
              Number
            </p>
          </label>
          <Input
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            
            className={`  ${errors.mobileNumber ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}  `}
          />
          {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
        </div>
        
        {/* {formData.deliverytype !== "delivery" && (
          <CalendarSelect workingHours={workingHours} />
        )} */}

        {/* <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Note
          </label>
          <textarea
            name="note"
            id="note"
            value={formData.note}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500"
          ></textarea>
        </div> */}
        {/* {formData.deliverytype === "delivery" &&
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-100"
            >
              <p>
                <span className="text-red-500">*</span>
                Delivery Location
              </p>
            </label>
            


          </div>
        } */}
        <div className='flex justify-end w-full items-center gap-2'>

        <Button variant={"secondary"} onClick={(e) => {e.preventDefault(); onSubmit()}}>
          Cancel
        </Button>
        <Button type='submit'>
          Save
        </Button>
        </div>
      </form>
  )
}

export default ReceiverDetail
