import React from "react";
import { getlegalPages } from "@/lib/action/PubilcCommon";
import { Button } from "@/components/ui/button";
import FAQRecommendation from "@/components/moreclub/Blog/FAQRecommendation";


const FAQContent = async () => {

    const faq = await getlegalPages('faq')

    return (
        <>
            {/* Page Title */}
            <h1 className="text-center text-3xl font-semibold text-primary mb-6">
                Frequently Asked Questions
            </h1>

            {/* FAQ Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
                {/* Text Content */}
                <article className="prose max-w-full prose-headings:text-card-foreground text-card-foreground prose-strong:text-card-foreground text-left md:text-justify ">
                    <h1>Benifits from Referals</h1>
                    <p>
                        With every successful referral, our members receive kickbacks from
                        the purchases made by their referred clients within our partner
                        network. These kickbacks serve as a token of appreciation for
                        their pivotal role in expanding our network and enriching our
                        platform's value proposition.
                    </p>
                    <p>
                        This system creates a mutually
                        beneficial scenario: new members gain access to our premium
                        services and benefits, while existing members are rewarded for
                        their advocacy and contribution to our platform's growth.
                    </p>

                </article>

                {/* Image */}
                <div className="flex justify-center">
                    <img src={"/images/png/expectation.png"} alt="FAQs" className="rounded-lg shadow-md w-full md:w-3/4" />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">
                <div className="col-span-12 lg:col-span-8 ">

                    {/* FAQ List */}
                    <div className="mt-8 max-w-6xl mx-auto">
                        {faq.map((item: any, index) => (
                            <div className="max-w-4xl mx-auto mt-12 p-8 bg-card text-card-foreground shadow-md rounded-lg mb-6">

                                <article key={`${item?.question}-${index}`} className="prose max-w-full prose-headings:text-card-foreground text-muted-foreground prose-strong:text-card-foreground text-left md:text-justify ">
                                    <h4 className="text-xl" >{item.question}</h4>
                                    <p>
                                        {item?.answer}
                                    </p>
                                </article>
                            </div>

                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto mt-12 p-8 bg-card text-card-foreground shadow-md rounded-lg mb-6">

                        <article className="prose max-w-full prose-headings:text-card-foreground text-muted-foreground prose-strong:text-card-foreground text-left md:text-justify ">
                            <h4 className="text-xl" >How to Delete My Account?</h4>
                            <p className="text-gray-700">
                                To delete your account, click the "Delete Account" button below.
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 mt-3 space-y-2">
                                <li>Your data will be permanently deleted and cannot be recovered.</li>
                                <li>All active subscriptions will be canceled.</li>
                                <li>Deletion may take up to 30 days for full removal.</li>
                            </ul>
                            <Button
                                variant={"destructive"}
                                className=""
                            //   onClick={() => setIsModalOpen(true)}
                            >
                                Delete Account
                            </Button>
                        </article>
                    </div>




                </div>
                <div className="col-span-12 lg:col-span-4">
                    {/* Support & Recent Posts */}
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-10">

                        <div>
                            <FAQRecommendation includeSupport={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQContent;
