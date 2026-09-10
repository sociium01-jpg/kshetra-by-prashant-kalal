import { useState, type ChangeEvent } from "react"
import { useSite, type TestimonialItem } from "../context/SiteContext"

interface AdminPortalProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = "leads" | "content" | "menu" | "media" | "ai"

export function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const {
    content,
    leads,
    mediaAssets,
    updateLeadStatus,
    deleteLead,
    updateContent,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addMediaAsset,
    deleteMediaAsset,
    updateGeminiApiKey,
    updateGithubToken,
    syncToGitHub,
    resetToDefaults,
  } = useSite()

  const [activeTab, setActiveTab] = useState<TabType>("leads")
  const [leadSearch, setLeadSearch] = useState("")
  const [leadFilter, setLeadFilter] = useState<"all" | "new" | "contacted" | "closed">("all")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [syncingGithub, setSyncingGithub] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)

  // AI Agent Chat State
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: "user" | "agent"; text: string; timestamp: string }>
  >([
    {
      id: "init-1",
      sender: "agent",
      text: "Hello Prashant! I am your Antigravity AI Agent for Kshetra. Tell me what you'd like to change (e.g., 'Update founder heading to Visionary Real Estate Advisor', 'Add quote: Precision in luxury plots', 'Push changes live to GitHub') and I will execute it live!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [agentThinking, setAgentThinking] = useState(false)

  // Testimonial Form State
  const [newTestimonial, setNewTestimonial] = useState<TestimonialItem>({
    name: "",
    title: "",
    quote: "",
  })

  if (!isOpen) return null

  function showSaveBanner() {
    setSaveSuccess(true)
    window.setTimeout(() => setSaveSuccess(false), 3000)
  }

  async function handleSyncToGitHub() {
    setSyncingGithub(true)
    setSyncMessage(null)
    try {
      const res = await syncToGitHub()
      if (res.success) {
        setSyncMessage("✅ " + res.message)
        showSaveBanner()
      } else {
        setSyncMessage("⚠️ " + res.message)
      }
    } catch {
      setSyncMessage("❌ Failed to initiate GitHub sync.")
    } finally {
      setSyncingGithub(false)
    }
  }

  async function sendAgentChatMessage() {
    const text = chatInput.trim()
    if (!text || agentThinking) return

    const userMsgId = `msg-${Date.now()}`
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setChatMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: "user", text, timestamp: timeStr },
    ])
    setChatInput("")
    setAgentThinking(true)

    const apiKey = content.geminiApiKey.trim()
    if (!apiKey) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: "agent",
          text: "⚠️ Please configure your Gemini API Key in the settings below so I can process natural language requests for you!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setAgentThinking(false)
      return
    }

    try {
      const systemPrompt = `You are Antigravity AI Agent, an intelligent website assistant for 'Kshetra by Prashant Kalal'.
The user wants you to assist with site copy, headings, testimonials, quotes, or syncing to GitHub.

Current Site State:
- Founder Heading: "${content.founder.heading}"
- Founder Subhead: "${content.founder.subhead}"
- Why Kshetra Subhead: "${content.whyKshetra.subhead}"
- Testimonials Count: ${content.testimonials.items.length}
- Hero Quotes Count: ${content.quotes.length}

If the user's request requires mutating site content, output a JSON block formatted like:
\`\`\`json
{
  "action": "UPDATE_CONTENT",
  "data": {
    "founder": { "heading": "..." }
  }
}
\`\`\`
Or for ADD_TESTIMONIAL:
\`\`\`json
{
  "action": "ADD_TESTIMONIAL",
  "data": { "name": "...", "title": "...", "quote": "..." }
}
\`\`\`
Or for ADD_QUOTE:
\`\`\`json
{
  "action": "ADD_QUOTE",
  "data": { "lines": ["Line 1", "Line 2"] }
}
\`\`\`
Or for SYNC_GITHUB:
\`\`\`json
{
  "action": "SYNC_GITHUB"
}
\`\`\`

User message: ${text}
Provide a helpful, friendly response confirming what action was taken.`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
          }),
        }
      )

      const json = await res.json()
      const responseText =
        json.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I analyzed your request, but couldn't process a valid response."

      // Check for JSON action block
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/)
      if (jsonMatch && jsonMatch[1]) {
        try {
          const actionData = JSON.parse(jsonMatch[1])
          if (actionData.action === "UPDATE_CONTENT" && actionData.data) {
            updateContent(actionData.data)
            showSaveBanner()
          } else if (actionData.action === "ADD_TESTIMONIAL" && actionData.data) {
            addTestimonial(actionData.data)
            showSaveBanner()
          } else if (actionData.action === "ADD_QUOTE" && actionData.data?.lines) {
            updateContent({
              quotes: [...content.quotes, { lines: actionData.data.lines }],
            })
            showSaveBanner()
          } else if (actionData.action === "SYNC_GITHUB") {
            handleSyncToGitHub()
          }
        } catch {
          // Ignore JSON parse error
        }
      }

      // Clean display text without raw json block if present
      const cleanText = responseText.replace(/```json[\s\S]*?```/g, "").trim() || responseText

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: "agent",
          text: cleanText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: "agent",
          text: "⚠️ Sorry, I encountered an error connecting to Gemini API: " + (err?.message || "Error"),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } finally {
      setAgentThinking(false)
    }
  }

  // Lead CSV Exporter
  function downloadLeadsCSV() {
    const headers = ["ID", "Name", "Phone", "Email", "Message", "Source", "Status", "Timestamp", "Notes"]
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${l.timestamp}"`,
      `"${l.notes || ""}"`,
    ])

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `kshetra-leads-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Media File Upload Handler (Up to 20MB)
  function handleMediaUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 20 * 1024 * 1024) {
      alert("File size exceeds 20MB limit. Please upload a file smaller than 20MB.")
      return
    }

    const isVideo = file.type.startsWith("video/")
    const isImage = file.type.startsWith("image/")

    if (!isImage && !isVideo) {
      alert("Please upload an image (PNG, JPG, WebP) or video file (MP4, WebM).")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      addMediaAsset({
        name: file.name,
        url: dataUrl,
        type: isVideo ? "video" : "image",
        size: file.size,
      })
      showSaveBanner()
    }
    reader.readAsDataURL(file)
  }

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      l.message.toLowerCase().includes(leadSearch.toLowerCase())
    const matchesFilter = leadFilter === "all" || l.status === leadFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gray/95 backdrop-blur-md">
      {/* Top Header Bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-muted/20 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-base font-bold text-ink sm:text-lg">
            Kshetra Admin CMS
          </h2>
          <span className="hidden rounded-full bg-brand/10 px-2.5 py-0.5 text-[0.68rem] font-semibold text-brand sm:inline">
            Live Connection Active
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            disabled={syncingGithub}
            onClick={handleSyncToGitHub}
            className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
          >
            <span>{syncingGithub ? "Syncing..." : "🚀 Push & Sync Live to GitHub"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all site content back to original defaults?")) {
                resetToDefaults()
                showSaveBanner()
              }
            }}
            className="rounded-lg border border-muted/30 px-3 py-1.5 text-xs font-semibold text-muted hover:bg-gray hover:text-ink"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-brand px-4 py-1.5 text-xs font-semibold text-white uppercase hover:bg-brand-dark transition-colors"
          >
            Exit Admin
          </button>
        </div>
      </header>

      {syncMessage && (
        <div className="bg-ink px-4 py-2 text-center text-xs font-medium text-white transition-all">
          {syncMessage}
        </div>
      )}

      {/* Live Save Notification */}
      {saveSuccess && (
        <div className="bg-emerald-600 px-4 py-2 text-center text-xs font-bold text-white shadow-md">
          ✓ Changes saved! Website updated in real-time.
        </div>
      )}

      {/* Main Body */}
      <div className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* Left Tab Sidebar */}
        <nav className="flex shrink-0 border-b border-muted/20 bg-white p-2 md:w-56 md:flex-col md:border-r md:border-b-0 md:p-4">
          <button
            type="button"
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "leads"
                ? "bg-brand text-white shadow-md"
                : "text-body hover:bg-gray"
            }`}
          >
            📩 Leads ({leads.filter((l) => l.status === "new").length} New)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "content"
                ? "bg-brand text-white shadow-md"
                : "text-body hover:bg-gray"
            }`}
          >
            ✍️ Section Content
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "menu"
                ? "bg-brand text-white shadow-md"
                : "text-body hover:bg-gray"
            }`}
          >
            🧭 Menu & Layout
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "media"
                ? "bg-brand text-white shadow-md"
                : "text-body hover:bg-gray"
            }`}
          >
            🖼️ Media (20MB)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "ai"
                ? "bg-brand text-white shadow-md"
                : "text-body hover:bg-gray"
            }`}
          >
            🤖 Gemini AI Copilot
          </button>
        </nav>

        {/* Tab Content Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: LEADS MANAGER */}
          {activeTab === "leads" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-ink">Lead Management</h3>
                  <p className="text-xs text-body">
                    Review and capture all property enquiries submitted via Contact page & Popup form.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={downloadLeadsCSV}
                  className="self-start rounded-xl border border-brand bg-white px-4 py-2 text-xs font-bold text-brand hover:bg-brand hover:text-white transition-all shadow-sm"
                >
                  📥 Export CSV
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Search by name, phone, message..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="flex-1 rounded-xl border border-muted/30 bg-white px-4 py-2 text-xs outline-none focus:border-brand"
                />
                <select
                  value={leadFilter}
                  onChange={(e) => setLeadFilter(e.target.value as any)}
                  className="rounded-xl border border-muted/30 bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-brand"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Leads</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Leads List */}
              <div className="grid gap-4">
                {filteredLeads.length === 0 ? (
                  <p className="rounded-2xl border border-muted/20 bg-white p-8 text-center text-xs text-muted">
                    No leads found matching your criteria.
                  </p>
                ) : (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="rounded-2xl border border-muted/20 bg-white p-5 shadow-sm transition-all hover:border-brand/30"
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-ink">{lead.name}</h4>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase ${
                                lead.status === "new"
                                  ? "bg-amber-100 text-amber-800"
                                  : lead.status === "contacted"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {lead.status}
                            </span>
                            <span className="text-[0.68rem] text-muted">
                              via {lead.source}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-brand font-semibold">
                            📞 {lead.phone} {lead.email ? `| ✉️ ${lead.email}` : ""}
                          </p>
                        </div>

                        <span className="text-[0.68rem] text-muted">
                          {new Date(lead.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-body bg-gray/50 p-3 rounded-xl">
                        "{lead.message}"
                      </p>

                      <div className="mt-4 flex flex-col gap-3 pt-3 border-t border-muted/15 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[0.7rem] font-bold text-muted uppercase">Status:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              updateLeadStatus(lead.id, e.target.value as any)
                              showSaveBanner()
                            }}
                            className="rounded-lg border border-muted/30 bg-white px-2.5 py-1 text-xs font-semibold text-ink outline-none focus:border-brand"
                          >
                            <option value="new">Mark as New</option>
                            <option value="contacted">Mark as Contacted</option>
                            <option value="closed">Mark as Closed</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Delete this lead record?")) {
                              deleteLead(lead.id)
                              showSaveBanner()
                            }
                          }}
                          className="self-start text-[0.7rem] font-semibold text-rose-600 hover:underline sm:self-auto"
                        >
                          Delete Lead
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SECTION CONTENT EDITOR */}
          {activeTab === "content" && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h3 className="text-xl font-bold text-ink">Section Content Editor</h3>
                <p className="text-xs text-body">
                  Edit text, headings, quotes, and bio details across every section of the website.
                </p>
              </div>

              {/* Meet Prashant Section */}
              <div className="rounded-2xl border border-muted/20 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-brand uppercase tracking-wider">
                  Meet Prashant Section
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-ink">Heading</label>
                  <input
                    type="text"
                    value={content.founder.heading}
                    onChange={(e) => {
                      updateContent({
                        founder: { ...content.founder, heading: e.target.value },
                      })
                    }}
                    className="mt-1 w-full rounded-xl border border-muted/30 p-2.5 text-xs text-ink outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Subhead / Tagline</label>
                  <input
                    type="text"
                    value={content.founder.subhead}
                    onChange={(e) => {
                      updateContent({
                        founder: { ...content.founder, subhead: e.target.value },
                      })
                    }}
                    className="mt-1 w-full rounded-xl border border-muted/30 p-2.5 text-xs text-ink outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Paragraphs</label>
                  {content.founder.paragraphs.map((p, idx) => (
                    <textarea
                      key={idx}
                      rows={2}
                      value={p}
                      onChange={(e) => {
                        const newP = [...content.founder.paragraphs]
                        newP[idx] = e.target.value
                        updateContent({
                          founder: { ...content.founder, paragraphs: newP },
                        })
                      }}
                      className="mt-2 w-full rounded-xl border border-muted/30 p-2.5 text-xs text-ink outline-none focus:border-brand"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={showSaveBanner}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white uppercase hover:bg-brand-dark"
                >
                  Save Section
                </button>
              </div>

              {/* Why Kshetra Section */}
              <div className="rounded-2xl border border-muted/20 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-brand uppercase tracking-wider">
                  Why Kshetra Section
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-ink">Heading</label>
                  <input
                    type="text"
                    value={content.whyKshetra.heading}
                    onChange={(e) => {
                      updateContent({
                        whyKshetra: { ...content.whyKshetra, heading: e.target.value },
                      })
                    }}
                    className="mt-1 w-full rounded-xl border border-muted/30 p-2.5 text-xs text-ink outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink">Subhead</label>
                  <input
                    type="text"
                    value={content.whyKshetra.subhead}
                    onChange={(e) => {
                      updateContent({
                        whyKshetra: { ...content.whyKshetra, subhead: e.target.value },
                      })
                    }}
                    className="mt-1 w-full rounded-xl border border-muted/30 p-2.5 text-xs text-ink outline-none focus:border-brand"
                  />
                </div>
                <button
                  type="button"
                  onClick={showSaveBanner}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white uppercase hover:bg-brand-dark"
                >
                  Save Section
                </button>
              </div>

              {/* Testimonials Manager */}
              <div className="rounded-2xl border border-muted/20 bg-white p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-bold text-brand uppercase tracking-wider">
                    Testimonials Manager
                  </h4>
                </div>

                <div className="grid gap-4">
                  {content.testimonials.items.map((t, idx) => (
                    <div key={idx} className="rounded-xl border border-muted/20 bg-gray/30 p-4 space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Client Name"
                          value={t.name}
                          onChange={(e) => {
                            updateTestimonial(idx, { ...t, name: e.target.value })
                          }}
                          className="w-1/2 rounded-lg border border-muted/30 p-2 text-xs font-bold text-ink"
                        />
                        <input
                          type="text"
                          placeholder="Title / Company (Optional)"
                          value={t.title}
                          onChange={(e) => {
                            updateTestimonial(idx, { ...t, title: e.target.value })
                          }}
                          className="w-1/2 rounded-lg border border-muted/30 p-2 text-xs text-ink"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={t.quote}
                        onChange={(e) => {
                          updateTestimonial(idx, { ...t, quote: e.target.value })
                        }}
                        className="w-full rounded-lg border border-muted/30 p-2 text-xs text-ink"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          deleteTestimonial(idx)
                          showSaveBanner()
                        }}
                        className="text-xs font-semibold text-rose-600 hover:underline"
                      >
                        Delete Testimonial
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Testimonial Form */}
                <div className="pt-4 border-t border-muted/20 space-y-3">
                  <h5 className="text-xs font-bold text-ink uppercase">Add New Testimonial</h5>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newTestimonial.name}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, name: e.target.value })
                      }
                      className="w-1/2 rounded-lg border border-muted/30 p-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Title (e.g. Owner, Company)"
                      value={newTestimonial.title}
                      onChange={(e) =>
                        setNewTestimonial({ ...newTestimonial, title: e.target.value })
                      }
                      className="w-1/2 rounded-lg border border-muted/30 p-2 text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Quote text..."
                    value={newTestimonial.quote}
                    onChange={(e) =>
                      setNewTestimonial({ ...newTestimonial, quote: e.target.value })
                    }
                    className="w-full rounded-lg border border-muted/30 p-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newTestimonial.name || !newTestimonial.quote) return
                      addTestimonial(newTestimonial)
                      setNewTestimonial({ name: "", title: "", quote: "" })
                      showSaveBanner()
                    }}
                    className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white uppercase hover:bg-brand-dark"
                  >
                    Add Testimonial
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MENU & LAYOUT MANAGER */}
          {activeTab === "menu" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-xl font-bold text-ink">Menu & Layout Manager</h3>
                <p className="text-xs text-body">
                  Edit navigation links, re-label menu items, and adjust section order.
                </p>
              </div>

              <div className="rounded-2xl border border-muted/20 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-brand uppercase tracking-wider">
                  Navigation Links
                </h4>

                {content.navLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newNav = [...content.navLinks]
                        newNav[idx] = { ...newNav[idx], label: e.target.value }
                        updateContent({ navLinks: newNav })
                      }}
                      className="w-1/2 rounded-lg border border-muted/30 p-2 text-xs font-semibold text-ink"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newNav = [...content.navLinks]
                        newNav[idx] = { ...newNav[idx], href: e.target.value }
                        updateContent({ navLinks: newNav })
                      }}
                      className="w-1/2 rounded-lg border border-muted/30 p-2 text-xs text-muted"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={showSaveBanner}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white uppercase hover:bg-brand-dark"
                >
                  Save Navigation
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA MANAGER (IMAGES & VIDEOS UP TO 20MB) */}
          {activeTab === "media" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-ink">Media Asset Manager</h3>
                  <p className="text-xs text-body">
                    Upload image and video files (up to 20MB) for use across website sections.
                  </p>
                </div>

                <label className="cursor-pointer rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white uppercase hover:bg-brand-dark transition-all shadow-md">
                  📤 Upload Media (Max 20MB)
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Media Gallery Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mediaAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="group relative overflow-hidden rounded-2xl border border-muted/20 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gray/50">
                      {asset.type === "video" ? (
                        <video
                          src={asset.url}
                          controls
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="truncate text-xs font-bold text-ink">{asset.name}</p>
                        <p className="text-[0.68rem] text-muted">
                          {(asset.size / (1024 * 1024)).toFixed(2)} MB | {asset.type}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(asset.url)
                            alert("Media URL copied to clipboard!")
                          }}
                          className="rounded-lg bg-gray px-2.5 py-1 text-[0.68rem] font-semibold text-ink hover:bg-brand hover:text-white"
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Delete this media asset?")) {
                              deleteMediaAsset(asset.id)
                              showSaveBanner()
                            }
                          }}
                          className="rounded-lg bg-rose-50 px-2.5 py-1 text-[0.68rem] font-semibold text-rose-600 hover:bg-rose-600 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GEMINI AI COPILOT & AGENT CHAT */}
          {activeTab === "ai" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-xl font-bold text-ink">Antigravity AI Agent & GitHub Sync</h3>
                <p className="text-xs text-body">
                  Chat with your AI Agent to change site copy, update quotes, manage testimonials, or push live updates to GitHub.
                </p>
              </div>

              {/* API Keys Configuration */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-muted/20 bg-white p-5 shadow-sm space-y-2">
                  <h4 className="text-xs font-bold text-ink uppercase">Gemini API Key</h4>
                  <input
                    type="password"
                    placeholder="AI Key (AIzaSy...)"
                    value={content.geminiApiKey}
                    onChange={(e) => updateGeminiApiKey(e.target.value)}
                    className="w-full rounded-xl border border-muted/30 p-2.5 text-xs outline-none focus:border-brand"
                  />
                  <p className="text-[0.68rem] text-muted">Required for AI Agent Chat & Copy suggestions.</p>
                </div>

                <div className="rounded-2xl border border-muted/20 bg-white p-5 shadow-sm space-y-2">
                  <h4 className="text-xs font-bold text-ink uppercase">GitHub Personal Access Token</h4>
                  <input
                    type="password"
                    placeholder="GitHub Token (ghp_...)"
                    value={content.githubToken}
                    onChange={(e) => updateGithubToken(e.target.value)}
                    className="w-full rounded-xl border border-muted/30 p-2.5 text-xs outline-none focus:border-brand"
                  />
                  <p className="text-[0.68rem] text-muted">Optional if GITHUB_TOKEN is set in Vercel environment variables.</p>
                </div>
              </div>

              {/* Interactive AI Agent Chat Box */}
              <div className="rounded-2xl border border-brand/20 bg-white p-6 shadow-md flex flex-col h-[28rem]">
                <div className="flex items-center justify-between border-b border-muted/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-brand animate-ping" />
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                      🤖 Antigravity AI Agent Chat
                    </h4>
                  </div>
                  <span className="text-[0.68rem] text-muted">Powered by Gemini 1.5 Flash</span>
                </div>

                {/* Chat Log Window */}
                <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2 text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                          msg.sender === "user"
                            ? "bg-brand text-white rounded-br-none"
                            : "bg-gray text-ink border border-muted/20 rounded-bl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="mt-1 text-[0.65rem] text-muted">{msg.timestamp}</span>
                    </div>
                  ))}

                  {agentThinking && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand animate-pulse">
                      <span>🤖 Agent is thinking & executing actions...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    sendAgentChatMessage()
                  }}
                  className="flex gap-2 border-t border-muted/15 pt-3"
                >
                  <input
                    type="text"
                    placeholder="Tell AI Agent what to change (e.g. 'Update founder heading to Visionary Advisor')..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={agentThinking}
                    className="flex-1 rounded-xl border border-muted/30 p-2.5 text-xs outline-none focus:border-brand"
                  />
                  <button
                    type="submit"
                    disabled={agentThinking || !chatInput.trim()}
                    className="rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white uppercase hover:bg-brand-dark disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
