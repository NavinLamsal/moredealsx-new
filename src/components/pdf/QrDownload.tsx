import React from "react";
import { pdf, Document, Page, Image, } from "@react-pdf/renderer";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

import { Button } from "../ui/button";
import PdfMaker from "./PdfMaker";
import { Loader2 } from "lucide-react";

interface QRDownloadProps {
  imageUrl: string;
  name: string;
  link: string;
}


// Define styles for the body content
const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    alignSelf: "stretch",
  },
  value: {
    fontSize: 12,
    textAlign: "right",
    flex: 1,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 350,
    height: 350,
    margin: "auto",
  },
});

const QRPDF: React.FC<QRDownloadProps> = ({ imageUrl, name, link })=> (
  
  <View style={styles.section}>
    <Text style={styles.title}>Refferal Qr</Text>
    
    <Image src={imageUrl} style={styles.image} />

    <View style={styles.section}>
      <Text style={styles.title}>{name}</Text>
    </View>
  </View>
);



// QRDownload Component
const QRDownload: React.FC<QRDownloadProps> = ({ imageUrl, name, link }) => {
const [loading, setLoading] = React.useState(false);


    const handleGenerateAndDownload = async () => {
        setLoading(true);
    
        // Create PDF document
        const doc = <PdfMaker title="Referal Qr"><QRPDF imageUrl={imageUrl} name={name} link={link}/></PdfMaker>;
        
        // Convert it to a blob
        const blob = await pdf(doc).toBlob();
    
        // Create a download link and trigger it
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}_refferal.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    
        // Clean up
        URL.revokeObjectURL(url);
        setLoading(false);
      };



  return (
    <Button
      className=""
      onClick={handleGenerateAndDownload}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Download QR
    </Button>
  );
};

export default QRDownload;
