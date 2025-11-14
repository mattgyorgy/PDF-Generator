import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'

type StyleType = 'modern' | 'bold' | 'classic'
type LogoAlignType = 'left' | 'center' | 'right'

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
    padding: 35,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
  },
  mainHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subHeadline: {
    fontSize: 11,
    color: '#666666',
  },
  rulesContainer: {
    marginTop: 15,
  },
  rule: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
  },
  ruleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ruleText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    marginBottom: 3,
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
    padding: 28,
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    marginBottom: 18,
    textAlign: 'center',
  },
  logo: {
    width: 55,
    height: 55,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
  },
  mainHeadline: {
    fontSize: 22,
    fontWeight: 'heavy',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subHeadline: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  rulesContainer: {
    marginTop: 18,
  },
  rule: {
    marginBottom: 12,
    padding: 12,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ruleNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'heavy',
    paddingTop: 5,
  },
  ruleTitle: {
    fontSize: 11,
    fontWeight: 'heavy',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  ruleText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    marginBottom: 3,
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
    padding: 35,
    backgroundColor: '#fef9f3',
    fontFamily: 'Times-Roman',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#666666',
    borderBottomStyle: 'solid',
  },
  logo: {
    width: 55,
    height: 55,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
  },
  mainHeadline: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subHeadline: {
    fontSize: 10,
    color: '#555555',
    fontStyle: 'italic',
  },
  rulesContainer: {
    marginTop: 18,
  },
  rule: {
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
  },
  ruleHeader: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  ruleNumber: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'Times-Bold',
    paddingTop: 2,
    marginRight: 10,
  },
  ruleTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  ruleText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    marginBottom: 4,
    color: '#333333',
    marginLeft: 28,
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
  logoAlign: LogoAlignType
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

export default function PdfDocument({ companyName, primaryColor, secondaryColor, font, logoImageUrl, logoAlign, style = 'modern' }: PdfDocumentProps) {
  const fontMapping: Record<string, string> = {
    helvetica: 'Helvetica',
    arial: 'Helvetica',
    georgia: 'Times-Roman',
    times: 'Times-Roman',
    courier: 'Courier',
    inter: 'Helvetica',
    lato: 'Helvetica',
    opensans: 'Helvetica',
    poppins: 'Helvetica',
    raleway: 'Helvetica',
    playfair: 'Times-Roman',
    merriweather: 'Times-Roman',
    roboto: 'Helvetica',
    montserrat: 'Helvetica',
    nunito: 'Helvetica',
    worksans: 'Helvetica',
  }
  
  const pdfFont = fontMapping[font] || 'Helvetica'
  const bodyTextColor = isLightColor(primaryColor) ? '#000000' : '#ffffff'
  
  const getLogoAlignment = () => {
    if (logoAlign === 'left') return { marginLeft: 0, marginRight: 'auto' }
    if (logoAlign === 'right') return { marginLeft: 'auto', marginRight: 0 }
    return { marginLeft: 'auto', marginRight: 'auto' }
  }

  const logoAlignmentStyle = getLogoAlignment()
  
  if (style === 'bold') {
    return (
      <Document>
        <Page size="A4" style={[boldStyles.page, { fontFamily: pdfFont, backgroundColor: primaryColor }]}>
          <View style={boldStyles.header}>
            <Image src={logoImageUrl} style={[boldStyles.logo, logoAlignmentStyle]} />
            <Text style={[boldStyles.mainHeadline, { color: secondaryColor, fontFamily: pdfFont }]}>
              VIDEO FILMING TIPS
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
                  <Text style={{ fontWeight: 'bold', color: secondaryColor, fontSize: 14 }}>✓</Text> {rule.doText}
                </Text>
                {rule.varietyShots && (
                  <View style={{ marginLeft: 20, marginTop: 3, marginBottom: 3 }}>
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <Text key={idx} style={[boldStyles.ruleText, { marginLeft: 0, marginBottom: 2, fontFamily: pdfFont, color: bodyTextColor }]}>
                        <Text style={{ fontWeight: 'bold', color: secondaryColor }}>{idx + 1}. {shot.label}:</Text> {shot.description}
                      </Text>
                    ))}
                    <Text style={[boldStyles.ruleText, { marginLeft: 0, fontStyle: 'italic', marginTop: 2, fontFamily: pdfFont, color: bodyTextColor }]}>
                      {rule.varietyNote}
                    </Text>
                  </View>
                )}
                {rule.dontText && (
                  <Text style={[boldStyles.ruleText, { fontFamily: pdfFont, color: bodyTextColor }]}>
                    <Text style={{ fontWeight: 'bold', color: secondaryColor, fontSize: 14 }}>✗</Text> {rule.dontText}
                  </Text>
                )}
              </View>
            ))}
          </View>
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
            <Image src={logoImageUrl} style={[classicStyles.logo, logoAlignmentStyle]} />
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
                  <View style={{ marginLeft: 28, marginTop: 3, marginBottom: 3 }}>
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <Text key={idx} style={[classicStyles.ruleText, { marginLeft: 0, marginBottom: 3, fontFamily: pdfFont, color: classicBodyTextColor }]}>
                        <Text style={{ fontFamily: pdfFont, color: secondaryColor }}>{idx + 1}. {shot.label}:</Text> {shot.description}
                      </Text>
                    ))}
                    <Text style={[classicStyles.ruleText, { marginLeft: 0, fontStyle: 'italic', marginTop: 2, fontFamily: pdfFont, color: classicBodyTextColor }]}>
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
        </Page>
      </Document>
    )
  }

  const modernBodyTextColor = '#333333' // Modern always has white background
  
  return (
    <Document>
      <Page size="A4" style={[modernStyles.page, { fontFamily: pdfFont }]}>
        <View style={modernStyles.header}>
          <Image src={logoImageUrl} style={[modernStyles.logo, logoAlignmentStyle]} />
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
                <View style={{ marginLeft: 15, marginTop: 3, marginBottom: 3 }}>
                  {rule.varietyShots.map((shot: any, idx: number) => (
                    <Text key={idx} style={[modernStyles.ruleText, { marginLeft: 0, marginBottom: 2, fontFamily: pdfFont, color: modernBodyTextColor }]}>
                      <Text style={{ fontWeight: 'bold', color: secondaryColor }}>{idx + 1}. {shot.label}:</Text> {shot.description}
                    </Text>
                  ))}
                  <Text style={[modernStyles.ruleText, { marginLeft: 0, fontStyle: 'italic', marginTop: 2, fontFamily: pdfFont, color: modernBodyTextColor }]}>
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
      </Page>
    </Document>
  )
}
