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
  { href: "#why", label: "Why Kshetra By Prashant Kalal?" },
  { href: "#founder", label: "Meet Prashant Kalal" },
  { href: "#journey", label: "I’ve Worked Across the Property Journey" },
  { href: "#journal", label: "The Journal" },
  { href: "#what-we-do", label: "What I Bring to the Table" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const

export const heroTagline =
  "Understanding property, people and the places that bring them together."

export const quotes = [
  {
    lines: [
      "I have seen properties from sale to possession.",
      "That journey taught me that what happens after the sale",
      "matters just as much as what happens before it.",
    ],
    wash: "tl" as const,
  },
  {
    lines: [
      "Real estate is ultimately about people, places",
      "and the lives that unfold between them.",
    ],
    wash: "tr" as const,
  },
  {
    lines: [
      "Kshetra by Prashant Kalal isn’t about telling",
      "people what to buy. It’s about helping them",
      "understand enough to decide for themselves.",
    ],
    wash: "tl" as const,
  },
]

export const whyKshetra = {
  heading: "Why Kshetra By Prashant Kalal?",
  subhead: "To share what experience has taught me.",
  paragraphs: [
    "Over 13+ years in real estate, I’ve seen how overwhelming a property decision can be,  from understanding locations and projects to evaluating documents, timelines and future potential.",
    "Kshetra By Prashant Kalal began with a simple thought: what if more understanding came before the decision?",
    "It is my way of sharing what I’ve learnt helping buyers and investors ask better questions, understand their choices and approach property with greater clarity.",
    "Sometimes the right decision is to buy. Sometimes, it’s to wait.",
    "Either way, the aim is simple - understand before you decide.",
  ],
}

export const founder = {
  heading: "Meet Prashant Kalal",
  subhead: "13+ years. Many roles. One industry.",
  paragraphs: [
    "My journey in real estate began in sales, where I learnt to understand people, their aspirations and what goes into a property decision.",
    "Over the years, I moved beyond sales into customer relationships, post-sales, possession and eventually operations for 100+ acre township developments as an Assistant General Manager.",
    "These experiences gave me a broader view of real estate from a buyer’s first conversation to the many details that shape a successful development.",
    "Today, as a MahaRERA-certified real estate agent, I bring this experience to Kshetra By Prashant Kalal, helping people approach property with greater clarity and perspective.",
  ],
  beyondHeading: "Beyond Real Estate",
  beyondParagraphs: [
    "Away from work, I enjoy yoga, good food, nature and discovering new places through hikes and trails.",
    "Perhaps that is why I’m interested not just in properties, but in places and what makes us feel connected to them.",
  ],
}

export const journey = {
  heading: "I’ve Worked Across the Property Journey",
  steps: [
    {
      title: "Sales",
      body: "Taught me to understand what people are really looking for.",
    },
    {
      title: "Post-sales",
      body: "Showed me the questions and concerns that emerge after a decision has been made.",
    },
    {
      title: "Possession",
      body: "Taught me how important execution, communication and attention to detail become when promises finally turn into homes.",
    },
    {
      title: "Township Operations",
      body: "Managing operations for large-scale township developments gave me a wider understanding of how numerous moving parts come together behind every development.",
    },
  ],
}

export const journal = {
  heading: "The Journal",
  intro: [
    "A collection of thoughts, observations and places that shape my perspective.",
    "From real estate and the way Pune is changing, to places beyond the city that offer a different pace and perspective, this is where I’ll share things I find interesting, useful or simply worth remembering.",
  ],
  realEstate: {
    heading: "Real Estate",
    body: "Insights, observations and things Prashant has learnt over 13+ years from questions worth asking before buying to understanding locations, projects, documentation, value and what happens after possession.",
  },
  beyondTheCity: {
    heading: "Beyond the City",
    body: "A visual collection of places around Pune, each accompanied by a short personal observation.",
    exampleLabel: "For Example -",
    places: [
      {
        title: "Mulshi",
        body: "For the days when a little distance from the city brings a lot of perspective.",
      },
      {
        title: "Panshet",
        body: "A reminder that Pune's best escapes are often closer than we think.",
      },
      {
        title: "Bhor",
        body: "Quiet places have a way of making you slow down.",
      },
    ],
  },
}

export const whatIBring = {
  heading: "What I Bring to the Table",
  subhead: "Experience that looks beyond the transaction.",
  items: [
    {
      icon: "home" as const,
      title: "A wider perspective",
      body: "Having worked across sales, post-sales, possession and operations.",
    },
    {
      icon: "building" as const,
      title: "A buyer-first approach",
      body: "Understanding the questions and concerns that arise at different stages.",
    },
    {
      icon: "compass" as const,
      title: "Local understanding",
      body: "A perspective shaped by working within Pune’s evolving real estate landscape.",
    },
    {
      icon: "chart" as const,
      title: "An independent conversation",
      body: "Helping you evaluate a decision without assuming that every decision needs to end in a purchase.",
    },
  ],
}

export const testimonials = {
  heading: "Testimonials",
  items: [
    {
      quote:
        "Kshetra By Prashant Kalal began with a simple thought: what if more understanding came before the decision?",
      name: "Prashant Kalal",
    },
    {
      quote: "Sometimes the right decision is to buy. Sometimes, it’s to wait.",
      name: "Prashant Kalal",
    },
    {
      quote: "Either way, the aim is simple - understand before you decide.",
      name: "Prashant Kalal",
    },
  ],
}

export const contactCopy = {
  heading: "Have a property question?",
  body: "Sometimes a conversation is a good place to start.",
}
