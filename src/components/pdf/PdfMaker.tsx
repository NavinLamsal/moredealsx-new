import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #000",
    paddingBottom: 10,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 50,
  },
  companyInfo: {
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    borderTop: "1px solid #000",
    paddingTop: 10,
  },
  body: {
    marginTop: 20,
  },
});

// Reusable PDF Component
const PdfMaker = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo & Company Info */}
      <View style={styles.headerContainer}>
        <Image src="/mnt/data/header.jpeg" style={styles.logo} />
        <View style={styles.companyInfo}>
          <Text>info@moredealsclub.com</Text>
          <Text>Stockholm</Text>
          <Text>+46 76 327 76 40</Text>
        </View>
      </View>

      {/* Custom Body */}
      <View style={styles.body}>{children}</View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Powered By Moretech Global</Text>
        <Text>2024@ All right reserved by Moretech Global</Text>
      </View>
    </Page>
  </Document>
);

export default PdfMaker;
