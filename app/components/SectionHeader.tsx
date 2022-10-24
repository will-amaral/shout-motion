import type { ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function SectionHeader(props: SectionHeaderProps) {
  const { title, subtitle, action } = props

  return (
    <header className="grid">
      <hgroup>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </hgroup>

      {action && <div className="align-right">{action}</div>}
    </header>
  )
}
