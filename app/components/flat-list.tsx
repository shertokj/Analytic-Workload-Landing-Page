'use client'

import { useState } from 'react'
import { mockData } from '@/lib/data'
import { AnalyzerCard } from './analyzer-card'

export function FlatList() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const flattenedData = mockData.flatMap(client =>
    client.projects.flatMap(project =>
      project.analyzers.map(analyzer => ({
        clientName: client.name,
        projectName: project.name,
        ...analyzer
      }))
    )
  )

  return (
    <div className="space-y-4">
      {flattenedData.map(item => (
        <AnalyzerCard
          key={item.id}
          analyzer={item}
          clientName={item.clientName}
          projectName={item.projectName}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={() => toggleExpand(item.id)}
        />
      ))}
    </div>
  )
}

