import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer'

const styles = StyleSheet.create({
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
    width: 80,
    height: 80,
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

interface PdfDocumentProps {
  companyName: string
  brandColor: string
  logoImageUrl: string
}

export default function PdfDocument({ companyName, brandColor, logoImageUrl }: PdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logoImageUrl} style={styles.logo} />
          <Text style={[styles.mainHeadline, { color: brandColor }]}>
            How to Film Pro-Quality Video on Your Phone
          </Text>
          <Text style={styles.subHeadline}>
            A 5-step guide from your friends at {companyName}
          </Text>
        </View>

        <View style={styles.rulesContainer}>
          <View style={[styles.rule, { borderLeftColor: brandColor }]}>
            <Text style={[styles.ruleTitle, { color: brandColor }]}>
              1. LIGHT: Face a Window
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Do:</Text> Your best light is free. Set up your phone and then face the nearest window.
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Don't:</Text> Never film with a window behind you.
            </Text>
          </View>

          <View style={[styles.rule, { borderLeftColor: brandColor }]}>
            <Text style={[styles.ruleTitle, { color: brandColor }]}>
              2. SOUND: Find a Quiet Room
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Do:</Text> A small room with a rug or curtains is perfect (even a closet!).
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Don't:</Text> Avoid big, empty rooms like kitchens or garages (they echo!).
            </Text>
          </View>

          <View style={[styles.rule, { borderLeftColor: brandColor }]}>
            <Text style={[styles.ruleTitle, { color: brandColor }]}>
              3. FRAME: Prop Your Phone Up
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Do:</Text> Film horizontally (turn your phone sideways!). Prop it on a stack of books and look at the camera lens, not at your own face on the screen.
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Don't:</Text> Never film holding the phone in your hand (it's shaky).
            </Text>
          </View>

          <View style={[styles.rule, { borderLeftColor: brandColor }]}>
            <Text style={[styles.ruleTitle, { color: brandColor }]}>
              4. CLEAN: Wipe Your Lens
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Do:</Text> Your phone lens is dirty. Use your t-shirt or a soft cloth to wipe the front and back camera lenses.
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Don't:</Text> A blurry video is usually just a smudged lens!
            </Text>
          </View>

          <View style={[styles.rule, { borderLeftColor: brandColor }]}>
            <Text style={[styles.ruleTitle, { color: brandColor }]}>
              5. SEND: Use the Special Link
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Do:</Text> Use the secure upload link I've provided. This sends the full, original, high-quality file.
            </Text>
            <Text style={styles.ruleText}>
              <Text style={{ fontWeight: 'bold' }}>Don't:</Text> Never text or email the video. (Those services shrink and ruin your file!)
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Powered by Hero</Text>
      </Page>
    </Document>
  )
}
