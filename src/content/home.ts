export const contact = {
  phone: "+91 97301 83066",
  phoneHref: "tel:+919730183066",
  email: "kshetrabyprashantkalal@gmail.com",
  emailHref: "mailto:kshetrabyprashantkalal@gmail.com",
  instagram: "kshetrabyprashantk",
  instagramHref: "https://instagram.com/kshetrabyprashantk",
  rera: "A011262602396",
}

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#why", label: "Why Kshetra" },
  { href: "#founder", label: "Founder" },
  { href: "#values", label: "Our Values" },
  { href: "#what-we-do", label: "What We Do" },
] as const

export const quotes = [
  {
    lines: ["Behind every address", "is a DECISION.", "Behind every decision", "should be TRUST."],
    wash: "tl" as const,
  },
  {
    lines: ["A good ADVICE", "can change the way", "you see an", "INVESTMENT."],
    wash: "tr" as const,
  },
  {
    lines: ["The right INVESTMENT", "begins with", "the right", "QUESTIONS."],
    wash: "tl" as const,
  },
  {
    lines: ["Real estate isn't just", "about finding a PROPERTY.", "It's about making", "the right CHOICE."],
    wash: "tr" as const,
  },
  {
    lines: ["Listen. Understand.", "ADVISE —", "rather than", "push a sale."],
    wash: "tl" as const,
  },
]

export const intents = [
  "Residential",
  "Commercial",
  "Investment",
  "Property Evaluation",
] as const

export const helpCards = [
  {
    icon: "home" as const,
    title: "Residential Real Estate",
    body: "A home has to work for how you live now — and for the years after you move in. I help you read product, location, and timing without the noise of a sales floor.",
  },
  {
    icon: "building" as const,
    title: "Commercial Real Estate",
    body: "Office, retail, or mixed-use: this is a business decision. I look at use, tenure, and whether the numbers hold once you are actually operating from the space.",
  },
  {
    icon: "compass" as const,
    title: "Property Advisory",
    body: "Already have a shortlist, a resale, or a project in mind? I evaluate it independently — strengths, gaps, and whether it is the right decision for you.",
  },
  {
    icon: "chart" as const,
    title: "Investment Guidance",
    body: "Yield, holding period, and exit. I separate a good story from a good asset, and I will tell you when waiting is the better move.",
  },
]

export const workSteps = [
  {
    icon: "listen" as const,
    title: "Understand",
    body: "I start with your life, timeline, and what this decision needs to do for you.",
  },
  {
    icon: "search" as const,
    title: "Evaluate",
    body: "Location, product, pricing, and the risks that do not show up in a brochure.",
  },
  {
    icon: "compare" as const,
    title: "Compare",
    body: "Options side by side — without the pressure of someone else's target.",
  },
  {
    icon: "advise" as const,
    title: "Advise",
    body: "A clear recommendation, and the reasoning behind it. Then you decide.",
  },
  {
    icon: "decide" as const,
    title: "Decide",
    body: "You choose. I stay with you through the paperwork and the questions after.",
  },
]

export const insightTopics = [
  "Pune real estate",
  "Residential",
  "Commercial",
  "Luxury",
  "Investment",
  "Property buying advice",
]
