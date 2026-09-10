import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  contact as defaultContact,
  contactCopy as defaultContactCopy,
  founder as defaultFounder,
  journey as defaultJourney,
  nav as defaultNav,
  quotes as defaultQuotes,
  testimonials as defaultTestimonials,
  whatIBring as defaultWhatIBring,
  whyKshetra as defaultWhyKshetra,
} from "../content/home"

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  message: string
  source: string
  timestamp: string
  status: "new" | "contacted" | "closed"
  notes?: string
}

export interface MediaAsset {
  id: string
  name: string
  url: string
  type: "image" | "video"
  size: number
  timestamp: string
}

export interface TestimonialItem {
  name: string
  title: string
  quote: string
}

export interface QuoteItem {
  lines: string[]
  linesMobile?: string[]
  wash?: "tr" | "tl"
}

export interface SiteContent {
  contactInfo: typeof defaultContact
  navLinks: Array<{ href: string; label: string }>
  quotes: QuoteItem[]
  whyKshetra: typeof defaultWhyKshetra
  founder: typeof defaultFounder
  journey: typeof defaultJourney
  whatIBring: typeof defaultWhatIBring
  testimonials: {
    heading: string
    items: TestimonialItem[]
  }
  contactCopy: typeof defaultContactCopy
  geminiApiKey: string
}

interface SiteContextType {
  content: SiteContent
  leads: Lead[]
  mediaAssets: MediaAsset[]
  addLead: (lead: Omit<Lead, "id" | "timestamp" | "status">) => void
  updateLeadStatus: (id: string, status: Lead["status"], notes?: string) => void
  deleteLead: (id: string) => void
  updateContent: (newContent: Partial<SiteContent>) => void
  addTestimonial: (item: TestimonialItem) => void
  updateTestimonial: (index: number, item: TestimonialItem) => void
  deleteTestimonial: (index: number) => void
  addMediaAsset: (asset: Omit<MediaAsset, "id" | "timestamp">) => void
  deleteMediaAsset: (id: string) => void
  updateGeminiApiKey: (key: string) => void
  resetToDefaults: () => void
}

const STORAGE_CONTENT_KEY = "kpk_site_content"
const STORAGE_LEADS_KEY = "kpk_site_leads"
const STORAGE_MEDIA_KEY = "kpk_site_media"

const initialContent: SiteContent = {
  contactInfo: defaultContact,
  navLinks: [...defaultNav],
  quotes: [...defaultQuotes],
  whyKshetra: defaultWhyKshetra,
  founder: defaultFounder,
  journey: defaultJourney,
  whatIBring: defaultWhatIBring,
  testimonials: defaultTestimonials,
  contactCopy: defaultContactCopy,
  geminiApiKey: "",
}

const SiteContext = createContext<SiteContextType | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONTENT_KEY)
      if (saved) {
        return { ...initialContent, ...JSON.parse(saved) }
      }
    } catch {
      // Fallback
    }
    return initialContent
  })

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LEADS_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // Fallback
    }
    return [
      {
        id: "lead-1",
        name: "Hitesh Saijpal",
        phone: "+1 408-555-0199",
        email: "hitesh.saijpal@example.com",
        message: "Interested in premium residential township options in Pune.",
        source: "Contact Page",
        timestamp: "2026-09-08T10:15:00.000Z",
        status: "contacted",
        notes: "Shared initial consultation details via WhatsApp.",
      },
    ]
  })

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MEDIA_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // Fallback
    }
    return [
      {
        id: "media-1",
        name: "founder-cutout.png",
        url: "/founder-cutout.png",
        type: "image",
        size: 485000,
        timestamp: "2026-09-08T12:00:00.000Z",
      },
      {
        id: "media-2",
        name: "kshetra-cityscape.jpg",
        url: "/kshetra-cityscape.jpg",
        type: "image",
        size: 920000,
        timestamp: "2026-09-08T12:00:00.000Z",
      },
    ]
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(content))
  }, [content])

  useEffect(() => {
    localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(leads))
  }, [leads])

  useEffect(() => {
    localStorage.setItem(STORAGE_MEDIA_KEY, JSON.stringify(mediaAssets))
  }, [mediaAssets])

  function addLead(leadData: Omit<Lead, "id" | "timestamp" | "status">) {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "new",
    }
    setLeads((prev) => [newLead, ...prev])
  }

  function updateLeadStatus(id: string, status: Lead["status"], notes?: string) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, notes: notes ?? l.notes } : l))
    )
  }

  function deleteLead(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id))
  }

  function updateContent(newContent: Partial<SiteContent>) {
    setContent((prev) => ({ ...prev, ...newContent }))
  }

  function addTestimonial(item: TestimonialItem) {
    setContent((prev) => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: [...prev.testimonials.items, item],
      },
    }))
  }

  function updateTestimonial(index: number, item: TestimonialItem) {
    setContent((prev) => {
      const items = [...prev.testimonials.items]
      items[index] = item
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          items,
        },
      }
    })
  }

  function deleteTestimonial(index: number) {
    setContent((prev) => {
      const items = prev.testimonials.items.filter((_, i) => i !== index)
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          items,
        },
      }
    })
  }

  function addMediaAsset(assetData: Omit<MediaAsset, "id" | "timestamp">) {
    const newAsset: MediaAsset = {
      ...assetData,
      id: `media-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
    setMediaAssets((prev) => [newAsset, ...prev])
  }

  function deleteMediaAsset(id: string) {
    setMediaAssets((prev) => prev.filter((a) => a.id !== id))
  }

  function updateGeminiApiKey(key: string) {
    setContent((prev) => ({ ...prev, geminiApiKey: key }))
  }

  function resetToDefaults() {
    setContent(initialContent)
    localStorage.removeItem(STORAGE_CONTENT_KEY)
  }

  return (
    <SiteContext.Provider
      value={{
        content,
        leads,
        mediaAssets,
        addLead,
        updateLeadStatus,
        deleteLead,
        updateContent,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addMediaAsset,
        deleteMediaAsset,
        updateGeminiApiKey,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) {
    throw new Error("useSite must be used within a SiteProvider")
  }
  return ctx
}
