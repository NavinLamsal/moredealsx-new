import { updateFormData } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ReceiverDetail = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.delivery);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        dispatch(updateFormData(updatedFormData));
      };


  return (
    <form className="space-y-6">
        <div>
          <label
            htmlFor="receiverName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            <p>
              <span className="text-red-500">*</span> Receiver&apos;s Name
            </p>
          </label>
          <input
            type="text"
            name="receiverName"
            id="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500"
          />
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
          <input
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* {formData.deliverytype !== "delivery" && (
          <CalendarSelect workingHours={workingHours} />
        )} */}

        <div>
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
        </div>
        {formData.deliverytype === "delivery" &&
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
        }
      </form>
  )
}

export default ReceiverDetail
