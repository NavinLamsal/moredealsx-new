import { getlegalPages } from "@/lib/action/PubilcCommon";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: 'Liscence | MOREDEALS CLUB',
    description: 'Understand our licensing terms, including permitted usage, restrictions, and intellectual property rights for our products and services.',
  }

export default async function LiscencePage() {

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

