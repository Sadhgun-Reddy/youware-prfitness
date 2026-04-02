import React from 'react'

type StitchDesignProps = {
  designName?: string
  html?: string
  imageSrc?: string
}

// Lightweight renderer that converts provided HTML into a React render.
// This is a starting point for Stitch-to-React conversion; the HTML should be
// sanitized before exposing to end-users.
export default function StitchDesign({ designName = 'Stitch Design', html = '', imageSrc }: StitchDesignProps) {
  return (
    <div className="stitch-design" style={{ padding: 16 }}>
      {imageSrc && (
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <img src={imageSrc} alt={designName} style={{ maxWidth: '100%', borderRadius: 12, boxShadow: '0 6px 20px rgba(0,0,0,.08)' }} />
        </div>
      )}
      <div className="design-html" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
