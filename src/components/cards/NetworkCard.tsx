import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { toggleUserSelection } from "@/lib/redux/slice/NetworkSlice";
import { NetworkUser } from "@/lib/type/moreclub/Network";




interface NetworkCardProps {
  user: NetworkUser;
  id: string;
  permissions?: { send_sms_refer?: boolean };
}

const NetworkCard: React.FC<NetworkCardProps> = ({ user, id, permissions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedRows = useSelector((state: RootState) => state.network);

  const isSelected = selectedRows.emailList.includes(user.email) || selectedRows.phoneList.includes(user.phone_number);

  const toggleSelection = (user: NetworkUser) => {
    dispatch(toggleUserSelection(user));
  }

  return (
    <div
  className={`bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-md flex items-center gap-4 transition-all hover:shadow-lg 
    ${isSelected ? "border-blue-500" : "border-gray-300"} max-w-sm`}
>
  <input type="checkbox" checked={isSelected} onChange={()=>toggleSelection(user)} className="w-5 h-5 accent-blue-600" />

  <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => router.push(`/networks/${id}`)}>
    {user.display_picture ? (
      <img src={user.display_picture} alt={`${user.first_name} ${user.last_name}`} className="w-12 h-12 rounded-full object-cover" />
    ) : (
      <div className="w-12 h-12 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full text-lg font-semibold text-white">
        {user.first_name.charAt(0)}{user.last_name.charAt(0)}
      </div>
    )}

    <div className="flex flex-col flex-grow">
      <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{user.first_name} {user.last_name}</h5>
      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone_number}</p>
    </div>
  </div>

  {permissions?.send_sms_refer && (
    <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-lg text-sm disabled:bg-gray-400" disabled={selectedRows.emailList.length > 1 || selectedRows.phoneList.length > 1 || !isSelected}>
      📩 Send Message
    </button>
  )}
</div>
  );
};

export default NetworkCard;
