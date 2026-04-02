import React from 'react'
import StitchDesign from './StitchDesign'

export default function StitchDemo() {
  // Placeholder HTML; replace with actual Stitch HTML for the target screen
  const exampleHtml = `
    <div style="padding: 16px; font-family: Inter, system-ui, sans-serif; color: #102a43; background: #fff; border-radius: 8px; border: 1px solid #e5e7eb;">
      <h2 style="margin:0 0 12px; font-size: 24px; font-weight: 700;">Stitch Design Demo</h2>
      <p style="margin:0; color: #6b7280;">This placeholder renders the HTML you provide. Replace with actual Stitch HTML.</p>
    </div>`
  return (
    <div className="p-4">
      <StitchDesign designName="Stitch Demo" html={exampleHtml} imageSrc={undefined} />
    </div>
  )
}
