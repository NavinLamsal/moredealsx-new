"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { AlertCircle, SendHorizonal } from "lucide-react";
import { useSelector } from "react-redux";
import { selectLeadDetailState } from "@/lib/redux/slice/moreclub/network";
import { Skeleton } from "@/components/ui/skeleton";
import SMSForm from "@/components/form/moredealsclub/network/SendSMS";
import EmailForm from "@/components/form/moredealsclub/network/SingleEmail";

interface ActivityItem {
    type: "email" | "sms" | "note";
    content: string;
    timestamp: string;
}

interface LeadDetailProps {
    name: string;
    email?: string;
    phone?: string;
    joinedDate: string;
    activities: ActivityItem[];
}


const lead = {
    name: "Navin Lamsal",
    email: "navin@example.com",
    phone: "+977-9812345678",
    joinedDate: "2025-06-20",
    activities: [
        {
            type: "sms",
            content: "Follow-up sent",
            timestamp: "2025-08-01T10:00:00Z",
        },
        {
            type: "email",
            content: "Sent welcome email",
            timestamp: "2025-07-31T14:30:00Z",
        },
    ],
}

// const LeadDetailPage: React.FC<{ lead: LeadDetailProps }> = ({ lead }) => {
const LeadDetailPage = ({id}:{id:string}) => {

    const { detail } = useSelector(selectLeadDetailState);

    const [smsMessage, setSmsMessage] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [activeTab, setActiveTab] = useState<"sms" | "email">(
        lead.phone ? "sms" : "email"
    );

    const handleSendSMS = () => {
        console.log("Sending SMS:", smsMessage);
        setSmsMessage("");
    };

    const handleSendEmail = () => {
        console.log("Sending Email:", { subject: emailSubject, body: emailBody });
        setEmailSubject("");
        setEmailBody("");
    };

    const renderActivity = (type: "sms" | "email" | "note") =>
        lead.activities
            .filter((item) => item.type === type)
            .sort(
                (a, b) =>
                    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            )
            .map((item, idx) => (
                <div key={idx} className="border-b pb-3 mb-3">
                    <p className="text-sm">{item.content}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleString()}
                    </p>
                </div>
            ));

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">
            {/* Lead Info */}
            <Card className="xl:col-span-1 h-fit border rounded-2xl">
                <CardContent className="space-y-4 p-6">
                    {/* Show error if present */}
                    {/* {error && (
          <AlertCircle/>
            <p className="text-sm">{error}</p>
          <AlertCircle/>
        )} */}

                    {/* Name */}
                    <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        {detail.loading ? (
                            <Skeleton className="h-5 w-3/4 mt-1 rounded" />
                        ) : (
                            <p className="font-medium text-base">{detail.data?.first_name || "N/A"} {detail.data?.last_name}</p>
                        )}
                    </div>

                    {/* Email */}

                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        {detail.loading ? (
                            <Skeleton className="h-5 w-4/5 mt-1 rounded" />
                        ) : (
                            <p>{detail.data?.email}</p>
                        )}
                    </div>


                    {/* Phone */}

                    <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        {detail.loading ? (
                            <Skeleton className="h-5 w-2/3 mt-1 rounded" />
                        ) : (
                            <p>{detail.data?.phone_number}</p>
                        )}
                    </div>


                    {/* Joined Date */}
                    <div>
                        <p className="text-sm text-muted-foreground">Joined Date</p>
                        {detail.loading ? (
                            <Skeleton className="h-5 w-1/2 mt-1 rounded" />
                        ) : (
                            <p>{detail.data?.join_date || "N/A"}</p>
                        )}
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Referred Date</p>
                        {detail.loading ? (
                            <Skeleton className="h-5 w-1/2 mt-1 rounded" />
                        ) : (
                            <p>{detail.data?.reffered_date || "N/A"}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Right Panel: Actions + Tabs */}
            <div className="xl:col-span-2 space-y-6">
                {/* Top: SMS / Email Sender */}
                <Card className="rounded-2xl">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex gap-2">
                            {detail.loading ? (
                                <Skeleton className="h-5 w-1/2 mt-1 rounded" />
                            ) : (
                                <>
                                    {detail.data?.phone_number && (
                                        <Button
                                            variant={activeTab === "sms" ? "default" : "outline"}
                                            onClick={() => setActiveTab("sms")}
                                        >
                                            Send SMS
                                        </Button>
                                    )}
                                    {detail.data?.email && (
                                        <Button
                                            variant={activeTab === "email" ? "default" : "outline"}
                                            onClick={() => setActiveTab("email")}
                                        >
                                            Send Email
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>

                        {activeTab === "sms" && detail.data?.phone_number && (
                            <SMSForm  to={detail.data.user_id}/>
                        )}

                        {activeTab === "email" && detail?.data?.email && (
                            <EmailForm  to={detail.data.user_id}/>
                        )}
                    </CardContent>
                </Card>

                {/* Tabbed History View */}
                {/* <Tabs defaultValue="sms" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="sms">SMS History</TabsTrigger>
                        <TabsTrigger value="email">Email History</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sms">
                        <Card className="p-6 rounded-2xl">
                            {renderActivity("sms").length ? (
                                renderActivity("sms")
                            ) : (
                                <p className="text-sm text-muted-foreground">No SMS history.</p>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="email">
                        <Card className="p-6 rounded-2xl">
                            {renderActivity("email").length ? (
                                renderActivity("email")
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No Email history.
                                </p>
                            )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity">
                        <Card className="p-6 rounded-2xl">
                            {lead.activities.length ? (
                                renderActivity("note")
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No activity recorded.
                                </p>
                            )}
                        </Card>
                    </TabsContent>
                </Tabs> */}
            </div>
        </div>
    );
};

export default LeadDetailPage;
