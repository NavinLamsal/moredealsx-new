import { getlegalPages } from "@/lib/action/PubilcCommon";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Terms and Conditions | MOREDEALS CLUB',
    description: 'Review our Terms & Conditions to understand the rules, rights, and responsibilities when using our platform.',
  }


export default async function TermsPage() {

    const data = await getlegalPages('terms_and_conditions')
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

