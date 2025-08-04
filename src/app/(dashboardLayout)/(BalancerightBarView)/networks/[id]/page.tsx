"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    fetchLeadDetail,
    // fetchEmails,
    // fetchSMS,
    // fetchActivity,
    // fetchNotes,
} from "@/lib/redux/slice/moreclub/network";

import { useParams } from "next/navigation";
import LeadDetailPage from "@/components/moreclub/network/networkDetailContent";
import { AppDispatch } from "@/lib/redux/store";

const Page = () => {

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const leadId = params?.id as string; // assuming route is /leads/[leadId]


    useEffect(() => {
        if (leadId) {
            dispatch(fetchLeadDetail(leadId));
            // dispatch(fetchEmails(leadId));
            // dispatch(fetchSMS(leadId));
            // dispatch(fetchActivity(leadId));
            // dispatch(fetchNotes(leadId));
        }
    }, [dispatch, leadId]);

    return (
        <div className="p-6">
            <LeadDetailPage id={leadId}/>
        </div>
    );
};

export default Page;
