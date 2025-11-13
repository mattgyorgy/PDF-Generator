import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'

type StyleType = 'modern' | 'bold' | 'classic'

// Helper function to determine if a color is light or dark
const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.5
}

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
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    marginBottom: 25,
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
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subHeadline: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  rulesContainer: {
    marginTop: 25,
  },
  rule: {
    marginBottom: 15,
    padding: 15,
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
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'heavy',
    borderTopWidth: 2,
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
    title: 'LIGHT: Find the Light',
    doText: 'Good light is your best friend. Film near windows or in brightly-lit areas.',
    dontText: "Don't film in dark, shadowy corners. If your video looks grainy, you need more light!",
  },
  {
    title: 'STABILITY: Stay Steady & Move Smoothly',
    doText: 'Film both vertical (for social media) and horizontal. Keep your phone as steady as possible—use two hands or prop it on a surface.',
    dontText: 'Avoid shaky, random camera movements. If you move, pan slowly and smoothly in one direction.',
  },
  {
    title: 'RECORD: Hold Each Shot for 10 Seconds',
    doText: 'This is the most important tip! Hit record and hold your shot perfectly still for at least 10 seconds.',
    dontText: 'Don\'t just tap "record" and "stop." We need those long, stable clips to edit with!',
  },
  {
    title: 'VARIETY: Get 3 Angles of Everything',
    doText: 'For every one subject, capture at least three different shots:',
    varietyShots: [
      { label: 'WIDE', description: 'Show the whole room or scene.' },
      { label: 'MEDIUM', description: 'Show the subject or action.' },
      { label: 'TIGHT', description: 'Get a close-up of the details (hands, a product, a sign).' },
    ],
    varietyNote: 'More angles and options are always better!',
    dontText: '',
  },
  {
    title: 'SEND: Use the Special Link',
    doText: "Use the secure upload link I've provided. This sends the full, original, high-quality file.",
    dontText: 'Don\'t text or email the video. (Those services shrink and ruin your file!)',
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
  const bodyTextColor = isLightColor(primaryColor) ? '#000000' : '#ffffff'
  
  if (style === 'bold') {
    return (
      <Document>
        <Page size="A4" style={[boldStyles.page, { fontFamily: pdfFont, backgroundColor: primaryColor }]}>
          <View style={boldStyles.header}>
            <Image src={logoImageUrl} style={boldStyles.logo} />
            <Text style={[boldStyles.mainHeadline, { color: secondaryColor, fontFamily: pdfFont }]}>
              PRO VIDEO TIPS
            </Text>
            <Text style={[boldStyles.subHeadline, { fontFamily: pdfFont, color: bodyTextColor }]}>
              From {companyName}
            </Text>
          </View>

          <View style={boldStyles.rulesContainer}>
            {rules.map((rule, index) => (
              <View key={index} style={boldStyles.rule}>
                <View style={boldStyles.ruleHeader}>
                  <Text style={[boldStyles.ruleNumber, { backgroundColor: secondaryColor, color: isLightColor(secondaryColor) ? '#000000' : '#ffffff', fontFamily: pdfFont }]}>
                    {index + 1}
                  </Text>
                  <Text style={[boldStyles.ruleTitle, { color: secondaryColor, fontFamily: pdfFont }]}>
                    {rule.title}
                  </Text>
                </View>
                <Text style={[boldStyles.ruleText, { fontFamily: pdfFont, color: bodyTextColor }]}>
                  <Text style={{ fontWeight: 'bold', color: secondaryColor }}>✓</Text> {rule.doText}
                </Text>
                {rule.varietyShots && (
                  <View style={{ marginLeft: 25, marginTop: 5, marginBottom: 5 }}>
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <Text key={idx} style={[boldStyles.ruleText, { marginLeft: 0, marginBottom: 3, fontFamily: pdfFont, color: bodyTextColor }]}>
                        <Text style={{ fontWeight: 'bold', color: secondaryColor }}>{idx + 1}. {shot.label}:</Text> {shot.description}
                      </Text>
                    ))}
                    <Text style={[boldStyles.ruleText, { marginLeft: 0, fontStyle: 'italic', marginTop: 3, fontFamily: pdfFont, color: bodyTextColor }]}>
                      {rule.varietyNote}
                    </Text>
                  </View>
                )}
                {rule.dontText && (
                  <Text style={[boldStyles.ruleText, { fontFamily: pdfFont, color: bodyTextColor }]}>
                    <Text style={{ fontWeight: 'bold', color: secondaryColor }}>✗</Text> {rule.dontText}
                  </Text>
                )}
              </View>
            ))}
          </View>

          <Text style={[boldStyles.footer, { fontFamily: pdfFont, color: bodyTextColor, borderTopColor: bodyTextColor }]}>POWERED BY HERO</Text>
        </Page>
      </Document>
    )
  }

  if (style === 'classic') {
    const classicBodyTextColor = '#333333' // Classic always has light cream background
    
    return (
      <Document>
        <Page size="A4" style={[classicStyles.page, { fontFamily: pdfFont }]}>
          <View style={classicStyles.header}>
            <Image src={logoImageUrl} style={classicStyles.logo} />
            <Text style={[classicStyles.mainHeadline, { color: primaryColor, fontFamily: pdfFont }]}>
              Professional Video Guidelines
            </Text>
            <Text style={[classicStyles.subHeadline, { fontFamily: pdfFont, color: classicBodyTextColor }]}>
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
                <Text style={[classicStyles.ruleText, { fontFamily: pdfFont, color: classicBodyTextColor }]}>
                  <Text style={{ fontFamily: pdfFont, color: secondaryColor }}>Recommended:</Text> {rule.doText}
                </Text>
                {rule.varietyShots && (
                  <View style={{ marginLeft: 32, marginTop: 5, marginBottom: 5 }}>
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <Text key={idx} style={[classicStyles.ruleText, { marginLeft: 0, marginBottom: 4, fontFamily: pdfFont, color: classicBodyTextColor }]}>
                        <Text style={{ fontFamily: pdfFont, color: secondaryColor }}>{idx + 1}. {shot.label}:</Text> {shot.description}
                      </Text>
                    ))}
                    <Text style={[classicStyles.ruleText, { marginLeft: 0, fontStyle: 'italic', marginTop: 4, fontFamily: pdfFont, color: classicBodyTextColor }]}>
                      {rule.varietyNote}
                    </Text>
                  </View>
                )}
                {rule.dontText && (
                  <Text style={[classicStyles.ruleText, { fontFamily: pdfFont, color: classicBodyTextColor }]}>
                    <Text style={{ fontFamily: pdfFont, color: secondaryColor }}>Avoid:</Text> {rule.dontText}
                  </Text>
                )}
              </View>
            ))}
          </View>

          <Text style={[classicStyles.footer, { fontFamily: pdfFont, color: classicBodyTextColor }]}>Powered by Hero</Text>
        </Page>
      </Document>
    )
  }

  const modernBodyTextColor = '#333333' // Modern always has white background
  
  return (
    <Document>
      <Page size="A4" style={[modernStyles.page, { fontFamily: pdfFont }]}>
        <View style={modernStyles.header}>
          <Image src={logoImageUrl} style={modernStyles.logo} />
          <Text style={[modernStyles.mainHeadline, { color: primaryColor, fontFamily: pdfFont }]}>
            How to Film Pro-Quality Video on Your Phone
          </Text>
          <Text style={[modernStyles.subHeadline, { fontFamily: pdfFont, color: modernBodyTextColor }]}>
            A 5-step guide from your friends at {companyName}
          </Text>
        </View>

        <View style={modernStyles.rulesContainer}>
          {rules.map((rule, index) => (
            <View key={index} style={[modernStyles.rule, { borderLeftColor: primaryColor }]}>
              <Text style={[modernStyles.ruleTitle, { color: primaryColor, fontFamily: pdfFont }]}>
                {index + 1}. {rule.title}
              </Text>
              <Text style={[modernStyles.ruleText, { fontFamily: pdfFont, color: modernBodyTextColor }]}>
                <Text style={{ fontWeight: 'bold', color: secondaryColor }}>Do:</Text> {rule.doText}
              </Text>
              {rule.varietyShots && (
                <View style={{ marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
                  {rule.varietyShots.map((shot: any, idx: number) => (
                    <Text key={idx} style={[modernStyles.ruleText, { marginLeft: 0, marginBottom: 3, fontFamily: pdfFont, color: modernBodyTextColor }]}>
                      <Text style={{ fontWeight: 'bold', color: secondaryColor }}>{idx + 1}. {shot.label}:</Text> {shot.description}
                    </Text>
                  ))}
                  <Text style={[modernStyles.ruleText, { marginLeft: 0, fontStyle: 'italic', marginTop: 3, fontFamily: pdfFont, color: modernBodyTextColor }]}>
                    {rule.varietyNote}
                  </Text>
                </View>
              )}
              {rule.dontText && (
                <Text style={[modernStyles.ruleText, { fontFamily: pdfFont, color: modernBodyTextColor }]}>
                  <Text style={{ fontWeight: 'bold', color: secondaryColor }}>Don't:</Text> {rule.dontText}
                </Text>
              )}
            </View>
          ))}
        </View>

        <Text style={[modernStyles.footer, { fontFamily: pdfFont, color: modernBodyTextColor }]}>Powered by Hero</Text>
      </Page>
    </Document>
  )
}
