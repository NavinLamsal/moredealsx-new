import { getlegalPages } from "@/lib/action/PubilcCommon";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Privacy Policy | MOREDEALS CLUB',
    description: '"Learn how we collect, use, and protect your personal data in our Privacy Policy.',
  }


export default async function PrivacyPage() {

    const data = await getlegalPages('privacy/policy')

    return (
            <>
            {data &&
          data.map((priv, index) => (
            <div className="flex flex-col gap-4"
              key={`${index}-${priv.title}`}
            >
             
                <h2 className="text-muted-foreground text-right">{priv.title}</h2>
                {/* <Content priv={priv.description} /> */}
                <div
                  className="prose max-w-full prose-headings:text-card-foreground text-card-foreground prose-strong:text-card-foreground text-justify "
                  dangerouslySetInnerHTML={{ __html: priv.description }}
                />
        
             
            </div>
          ))}
            </>
    );
}

