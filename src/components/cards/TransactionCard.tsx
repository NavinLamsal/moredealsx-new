"use client";

import React, { forwardRef } from "react";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TransactionDetailView from "../moreclub/Transaction/TransactionDetail";
import { Calendar, CheckCircle2Icon, CircleX, Download, PlusCircle, Upload } from "lucide-react";
// import TransactionDetailView from "./transactionDetail";

interface TransactionCardProps {
  id: string;
  type: string;
  narration: string;
  is_Completed: Boolean;
  time: string;
  amount: string;
  currency: string;

}

// ✅ Use forwardRef to allow parent components to attach refs for infinite scroll
const TransactionCard = forwardRef<HTMLDivElement, TransactionCardProps>(
  ({ id, type, narration, time, amount, currency, is_Completed }, ref) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Determine transaction type icon


    return (
      <>
        {/* Transaction Card */}
        <div className="p-2 xl:p-4  border-b border-gray-200 cursor-pointer hover:bg-background transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
          ref={ref} // ✅ Attach ref here for infinite scrolling
        >

          <div

            className="flex items-start "

          >
            {/* Transaction Icon */}
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border bg-white">
              {/* <AvatarImage src={getIconSrc()} alt="Transaction Type" /> */}
              {type === "RECEIVE" || type === "REFER" ?
                <Download className="h-5 w-5  text-green-600" />
                :
                <>
                  {type === "LOAD" ?
                    <PlusCircle className="h-5 w-5 text-primary" />
                    :
                    <Upload className="h-5 w-5  text-red-600" />
                  }
                </>
              }
              {/* <AvatarFallback>{type.charAt(0)}</AvatarFallback> */}
            </Avatar>

            {/* Transaction Details */}
            <div className="ml-4 space-y-1 flex-1">
              <p className="text-sm font-medium leading-none flex ">
                <span>{narration}</span>
                <span>


                </span>
              </p>

              <p className="text-xs text-gray-500 flex items-center">
                <Calendar className="mr-1 text-xs" size={"12"} /> {time}
              </p>

            </div>
            <div className={`ml-auto font-medium flex items-start px-1 py-0.5 text-xs rounded-sm ${type === "RECEIVE" || type === "REFER" || type === "LOAD" ? "text-green-500 bg-green-500/20 " : "text-red-500 bg-red-500/20"}`}>
              {currency}{" "}
              {amount}
            </div>
          </div>

          {/* Transaction Amount */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {/* <strong>Balance:</strong>  */}
              <span className=" px-1 py-0.5 ml-2 rounded-sm bg-[hsla(264,68%,49%,0.2)] text-primary  ">
                {moment.utc(time).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </p>
            {is_Completed ? (
              <CheckCircle2Icon className="text-white ml-1" fill="oklch(0.627 0.194 149.214)" />
            ) : (
              <CircleX className="text-white ml-1" fill="oklch(0.577 0.245 27.325)" />
            )}

          </div>
        </div>

        {/* Transaction Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
            </DialogHeader>

            <TransactionDetailView transactionId={id} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

// ✅ Add display name to avoid issues in development
TransactionCard.displayName = "TransactionCard";

export default TransactionCard;
