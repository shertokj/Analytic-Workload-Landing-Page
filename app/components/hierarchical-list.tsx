'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { mockData } from '@/lib/data'
import { AnalyzerCard } from './analyzer-card'

export function HierarchicalList() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-4">
      {mockData.map(client => (
        <div key={client.id} className="border rounded-lg p-4 bg-white">
          <button
            className="flex items-center w-full text-left font-semibold text-lg mb-2"
            onClick={() => toggleExpand(client.id)}
          >
            {expandedItems.includes(client.id) ? (
              <ChevronDown className="mr-2" />
            ) : (
              <ChevronRight className="mr-2" />
            )}
            <span className="truncate" title={client.name}>{client.name}</span>
          </button>
          {expandedItems.includes(client.id) && (
            <div className="ml-6 space-y-4">
              {client.projects.map(project => (
                <div key={project.id} className="border-l pl-4">
                  <button
                    className="flex items-center w-full text-left font-medium text-md mb-2"
                    onClick={() => toggleExpand(project.id)}
                  >
                    {expandedItems.includes(project.id) ? (
                      <ChevronDown className="mr-2" />
                    ) : (
                      <ChevronRight className="mr-2" />
                    )}
                    <span className="truncate" title={project.name}>{project.name}</span>
                  </button>
                  {expandedItems.includes(project.id) && (
                    <div className="space-y-2">
                      {project.analyzers.map(analyzer => (
                        <AnalyzerCard
                          key={analyzer.id}
                          analyzer={analyzer}
                          clientName={client.name}
                          projectName={project.name}
                          isExpanded={expandedItems.includes(analyzer.id)}
                          onToggle={() => toggleExpand(analyzer.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

