---
name: Organic Weaver
colors:
  surface: '#fff8f7'
  surface-dim: '#e7d6d6'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#fbeaea'
  surface-container-high: '#f6e4e4'
  surface-container-highest: '#f0dfde'
  on-surface: '#22191a'
  on-surface-variant: '#4d4548'
  inverse-surface: '#382e2e'
  inverse-on-surface: '#feedec'
  outline: '#7e7578'
  outline-variant: '#cfc3c7'
  surface-tint: '#685b60'
  primary: '#362b30'
  on-primary: '#ffffff'
  primary-container: '#4d4146'
  on-primary-container: '#beadb3'
  inverse-primary: '#d3c2c8'
  secondary: '#85504b'
  on-secondary: '#ffffff'
  secondary-container: '#ffbbb4'
  on-secondary-container: '#7b4843'
  tertiary: '#2e2e2c'
  on-tertiary: '#ffffff'
  tertiary-container: '#454442'
  on-tertiary-container: '#b3b1ae'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f0dee4'
  primary-fixed-dim: '#d3c2c8'
  on-primary-fixed: '#22191d'
  on-primary-fixed-variant: '#504349'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#fab6ae'
  on-secondary-fixed: '#340f0c'
  on-secondary-fixed-variant: '#693934'
  tertiary-fixed: '#e5e2df'
  tertiary-fixed-dim: '#c8c6c3'
  on-tertiary-fixed: '#1c1c1a'
  on-tertiary-fixed-variant: '#474745'
  background: '#fff8f7'
  on-background: '#22191a'
  surface-variant: '#f0dfde'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  accent-handwritten:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '300'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1140px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

This design system is built for the psychology practice of Marta Martín, centered on the concept of "hilando fino" (spinning/weaving finely). The brand personality is empathetic, patient, and deeply human. It reflects the process of untangling complex thoughts and weaving them into a coherent personal narrative.

The visual style is **Organic Minimalism**. It prioritizes breathability and soft transitions to create a safe digital space for mental health. By utilizing hand-drawn line motifs inspired by the logo’s "tangled brain" and "smooth thread," the UI balances professional clinical expertise with a warm, approachable boutique feel. The emotional goal is to evoke a sense of relief, clarity, and gentle progress.

## Colors

The palette is directly extracted from the provided visual identity to ensure seamless brand continuity:

- **Primary (Deep Charcoal/Brown):** Used for primary typography, navigation, and structural lines. It provides the grounding force of the design, representing stability and professional authority.
- **Secondary (Dusty Rose/Terracotta):** Reserved for accents, calls to action, and highlighting growth or emotional warmth. This color bridges the gap between clinical and personal.
- **Tertiary/Background (Warm Off-White):** The canvas of the website. This soft, light gray-beige reduces eye strain and feels more natural and welcoming than a pure white background.
- **Neutral (Muted Taupe):** Used for secondary text, metadata, and decorative elements that require a softer presence than the primary charcoal.

## Typography

The typographic strategy balances structured professionalism with organic rhythm.

- **Headlines:** Use **Manrope** for its modern, balanced, and trustworthy feel. Its geometric nature provides a sense of order amidst the "weaving" concept.
- **Body:** Use **Plus Jakarta Sans** for its friendly, rounded terminals which maximize readability and approachable warmth.
- **Accents:** While the logo contains a specific custom script, **Epilogue** (in light italic weights) or specific SVG-based hand-drawn underlines should be used for pull-quotes and "personal notes" to mimic the "hilando fino" handwritten vibe.
- **Hierarchy:** Maintain generous line heights (1.6+) to ensure the content feels airy and digestible, reflecting mental clarity.

## Layout & Spacing

The layout follows a **Fluid Grid** with an emphasis on "Negative Space as a Feature."

- **The Weaver's Path:** Content should not always be strictly centered. Slight offsets in image and text placement (asymmetrical balance) reflect an organic, human-centric flow.
- **Desktop:** A 12-column grid with wide margins. Sections are separated by significant vertical gaps (`section-gap`) to allow the user to "breathe" between different topics.
- **Mobile:** A single-column flow with 20px side margins. Interactive elements (buttons, inputs) must maintain a minimum 48px height for accessibility.
- **The Thread:** Use horizontal rules sparingly, but when used, they should be thin (1px) and potentially have a slight "wave" or "hand-drawn" imperfection rather than a perfectly straight vector line.

## Elevation & Depth

To maintain the organic and gentle feel, traditional heavy shadows are avoided.

- **Tonal Layers:** Depth is created through subtle shifts in background color (e.g., a card using a slightly darker version of the Warm Off-White).
- **Soft Outlines:** Instead of shadows, use thin, low-contrast borders in the Neutral Taupe color to define containers.
- **Depth through Overlap:** Elements like images and text boxes may slightly overlap, mimicking the way threads cross over each other in a loom.
- **Interactive States:** Buttons use a soft "lift" (very diffused, low-opacity terracotta-tinted shadow) only upon hover to provide tactile feedback without breaking the minimalist aesthetic.

## Shapes

The shape language is dominated by **Rounded** and **Irregular** forms.

- **Corners:** Standard UI components use a 0.5rem (8px) radius to feel soft but professional.
- **Organic Containers:** For hero images or decorative backgrounds, use "blob" shapes or containers with varying border-radii (e.g., `60% 40% 30% 70% / 60% 30% 70% 40%`) to mimic the hand-drawn brain in the logo.
- **Icons:** Use thin-stroke (1.5px) icons with rounded caps and joins to match the "thread" aesthetic.

## Components

- **Buttons:** Primary buttons are solid Dusty Rose with White text. Secondary buttons use a Deep Charcoal outline with no fill. All buttons feature high-radius corners (Pill-shaped) to appear non-threatening.
- **Cards:** Used for services and blog posts. They should have no shadow, a 1px Neutral border, and generous internal padding (32px).
- **Input Fields:** Minimalist design with only a bottom border that thickens and changes to Dusty Rose on focus.
- **The "Thread" Divider:** A custom component—a thin, animated line that "unravels" as the user scrolls, acting as a visual guide through the page narrative.
- **Chips/Tags:** Used for therapy specializations (e.g., "Anxiety," "Self-esteem"). Small, Pill-shaped, with a Tertiary background and Charcoal text.
- **Lists:** Use custom bullet points that look like small knots or hand-drawn circles.
