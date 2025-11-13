import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'

type StyleType = 'modern' | 'bold' | 'classic'

const modernStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
  },
  mainHeadline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeadline: {
    fontSize: 12,
    color: '#666666',
  },
  rulesContainer: {
    marginTop: 20,
  },
  rule: {
    marginBottom: 20,
    paddingLeft: 15,
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
  },
  ruleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  ruleText: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
  },
})

const boldStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    marginBottom: 25,
    backgroundColor: '#1a1a1a',
    padding: 20,
    marginLeft: -30,
    marginRight: -30,
    marginTop: -30,
    textAlign: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
  },
  mainHeadline: {
    fontSize: 26,
    fontWeight: 'heavy',
    marginBottom: 8,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subHeadline: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  rulesContainer: {
    marginTop: 25,
  },
  rule: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
    borderRadius: 4,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'heavy',
    color: '#ffffff',
    paddingTop: 5,
  },
  ruleTitle: {
    fontSize: 12,
    fontWeight: 'heavy',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  ruleText: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'heavy',
    color: '#1a1a1a',
    borderTopWidth: 2,
    borderTopColor: '#1a1a1a',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
})

const classicStyles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#fef9f3',
    fontFamily: 'Times-Roman',
  },
  header: {
    marginBottom: 40,
    textAlign: 'center',
    paddingBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#666666',
    borderBottomStyle: 'solid',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
  },
  mainHeadline: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subHeadline: {
    fontSize: 11,
    color: '#555555',
    fontStyle: 'italic',
  },
  rulesContainer: {
    marginTop: 30,
  },
  rule: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
  },
  ruleHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ruleNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Times-Bold',
    paddingTop: 3,
    marginRight: 12,
  },
  ruleTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  ruleText: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 6,
    color: '#333333',
    marginLeft: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 10,
    color: '#888888',
    fontStyle: 'italic',
    borderTopWidth: 2,
    borderTopColor: '#cccccc',
    borderTopStyle: 'solid',
    paddingTop: 15,
  },
})

interface PdfDocumentProps {
  companyName: string
  primaryColor: string
  secondaryColor: string
  font: string
  logoImageUrl: string
  style?: StyleType
}

const rules = [
  {
    title: 'LIGHT: Face a Window',
    doText: 'Your best light is free. Set up your phone and then face the nearest window.',
    dontText: "Never film with a window behind you.",
  },
  {
    title: 'SOUND: Find a Quiet Room',
    doText: 'A small room with a rug or curtains is perfect (even a closet!).',
    dontText: 'Avoid big, empty rooms like kitchens or garages (they echo!).',
  },
  {
    title: 'FRAME: Prop Your Phone Up',
    doText: "Film horizontally (turn your phone sideways!). Prop it on a stack of books and look at the camera lens, not at your own face on the screen.",
    dontText: "Never film holding the phone in your hand (it's shaky).",
  },
  {
    title: 'CLEAN: Wipe Your Lens',
    doText: 'Your phone lens is dirty. Use your t-shirt or a soft cloth to wipe the front and back camera lenses.',
    dontText: 'A blurry video is usually just a smudged lens!',
  },
  {
    title: 'SEND: Use the Special Link',
    doText: "Use the secure upload link I've provided. This sends the full, original, high-quality file.",
    dontText: 'Never text or email the video. (Those services shrink and ruin your file!)',
  },
]

export default function PdfDocument({ companyName, primaryColor, secondaryColor, font, logoImageUrl, style = 'modern' }: PdfDocumentProps) {
  const fontMapping: Record<string, string> = {
    helvetica: 'Helvetica',
    times: 'Times-Roman',
    courier: 'Courier',
    inter: 'Helvetica',
    playfair: 'Times-Roman',
    roboto: 'Helvetica',
    montserrat: 'Helvetica',
  }
  
  const pdfFont = fontMapping[font] || 'Helvetica'
  if (style === 'bold') {
    return (
      <Document>
        <Page size="A4" style={[boldStyles.page, { fontFamily: pdfFont }]}>
          <View style={boldStyles.header}>
            <Image src={logoImageUrl} style={boldStyles.logo} />
            <Text style={[boldStyles.mainHeadline, { color: primaryColor, fontFamily: pdfFont }]}>
              PRO VIDEO TIPS
            </Text>
            <Text style={[boldStyles.subHeadline, { fontFamily: pdfFont }]}>
              From {companyName}
            </Text>
          </View>

          <View style={boldStyles.rulesContainer}>
            {rules.map((rule, index) => (
              <View key={index} style={[boldStyles.rule, { borderLeftColor: primaryColor }]}>
                <View style={boldStyles.ruleHeader}>
                  <Text style={[boldStyles.ruleNumber, { backgroundColor: primaryColor, fontFamily: pdfFont }]}>
                    {index + 1}
                  </Text>
                  <Text style={[boldStyles.ruleTitle, { color: primaryColor, fontFamily: pdfFont }]}>
                    {rule.title}
                  </Text>
                </View>
                <Text style={[boldStyles.ruleText, { fontFamily: pdfFont }]}>
                  <Text style={{ fontWeight: 'bold', color: secondaryColor }}>✓</Text> {rule.doText}
                </Text>
                <Text style={[boldStyles.ruleText, { color: '#666666', fontFamily: pdfFont }]}>
                  <Text style={{ fontWeight: 'bold', color: secondaryColor }}>✗</Text> {rule.dontText}
                </Text>
              </View>
            ))}
          </View>

          <Text style={[boldStyles.footer, { fontFamily: pdfFont }]}>POWERED BY HERO</Text>
        </Page>
      </Document>
    )
  }

  if (style === 'classic') {
    return (
      <Document>
        <Page size="A4" style={[classicStyles.page, { fontFamily: pdfFont }]}>
          <View style={classicStyles.header}>
            <Image src={logoImageUrl} style={classicStyles.logo} />
            <Text style={[classicStyles.mainHeadline, { color: primaryColor, fontFamily: pdfFont }]}>
              Professional Video Guidelines
            </Text>
            <Text style={[classicStyles.subHeadline, { fontFamily: pdfFont }]}>
              Presented by {companyName}
            </Text>
          </View>

          <View style={classicStyles.rulesContainer}>
            {rules.map((rule, index) => (
              <View key={index} style={classicStyles.rule}>
                <View style={classicStyles.ruleHeader}>
                  <Text style={[classicStyles.ruleNumber, { borderColor: primaryColor, color: primaryColor, fontFamily: pdfFont }]}>
                    {index + 1}
                  </Text>
                  <Text style={[classicStyles.ruleTitle, { color: primaryColor, fontFamily: pdfFont }]}>
                    {rule.title}
                  </Text>
                </View>
                <Text style={[classicStyles.ruleText, { fontFamily: pdfFont }]}>
                  <Text style={{ fontFamily: pdfFont, color: secondaryColor }}>Recommended:</Text> {rule.doText}
                </Text>
                <Text style={[classicStyles.ruleText, { color: '#666666', fontFamily: pdfFont }]}>
                  <Text style={{ fontFamily: pdfFont, color: secondaryColor }}>Avoid:</Text> {rule.dontText}
                </Text>
              </View>
            ))}
          </View>

          <Text style={[classicStyles.footer, { fontFamily: pdfFont }]}>Powered by Hero</Text>
        </Page>
      </Document>
    )
  }

  return (
    <Document>
      <Page size="A4" style={[modernStyles.page, { fontFamily: pdfFont }]}>
        <View style={modernStyles.header}>
          <Image src={logoImageUrl} style={modernStyles.logo} />
          <Text style={[modernStyles.mainHeadline, { color: primaryColor, fontFamily: pdfFont }]}>
            How to Film Pro-Quality Video on Your Phone
          </Text>
          <Text style={[modernStyles.subHeadline, { fontFamily: pdfFont }]}>
            A 5-step guide from your friends at {companyName}
          </Text>
        </View>

        <View style={modernStyles.rulesContainer}>
          {rules.map((rule, index) => (
            <View key={index} style={[modernStyles.rule, { borderLeftColor: primaryColor }]}>
              <Text style={[modernStyles.ruleTitle, { color: primaryColor, fontFamily: pdfFont }]}>
                {index + 1}. {rule.title}
              </Text>
              <Text style={[modernStyles.ruleText, { fontFamily: pdfFont }]}>
                <Text style={{ fontWeight: 'bold', color: secondaryColor }}>Do:</Text> {rule.doText}
              </Text>
              <Text style={[modernStyles.ruleText, { fontFamily: pdfFont }]}>
                <Text style={{ fontWeight: 'bold', color: secondaryColor }}>Don't:</Text> {rule.dontText}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[modernStyles.footer, { fontFamily: pdfFont }]}>Powered by Hero</Text>
      </Page>
    </Document>
  )
}
