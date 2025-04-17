'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { type AnalyzerPath } from '@/lib/types'
import { Badge } from "@/components/ui/badge"

interface GroupedAnalyzer {
  name: string
  paths: AnalyzerPath[]
}

interface SearchResultsProps {
  results: AnalyzerPath[]
  searchTerm: string
}

export function SearchResults({ results, searchTerm }: SearchResultsProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const groupedResults = useMemo(() => {
    const groups: GroupedAnalyzer[] = []
    const analyzerMap = new Map<string, AnalyzerPath[]>()

    results.forEach(result => {
      const existing = analyzerMap.get(result.analyzer.name) || []
      analyzerMap.set(result.analyzer.name, [...existing, result])
    })

    analyzerMap.forEach((paths, name) => {
      groups.push({ name, paths })
    })

    return groups.sort((a, b) => a.name.localeCompare(b.name))
  }, [results])

  const toggleGroup = (name: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#747480]">No analyzers found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {groupedResults.map(({ name, paths }) => (
        <div
          key={name}
          className="border border-[#2E2E3B] rounded-lg bg-[#1A1A24] overflow-hidden"
        >
          <button
            onClick={() => toggleGroup(name)}
            className="w-full flex items-center justify-between p-4 hover:bg-[#2E2E3B] transition-colors"
          >
            <div className="flex items-center gap-2">
              {expandedGroups.has(name) ? (
                <ChevronDown className="h-5 w-5 text-[#FFE600]" />
              ) : (
                <ChevronRight className="h-5 w-5 text-[#FFE600]" />
              )}
              <span className="text-lg font-semibold text-white">
                {name}
              </span>
              <Badge variant="outline" className="border-[#747480] text-[#747480]">
                {paths.length}
              </Badge>
            </div>
          </button>
          {expandedGroups.has(name) && (
            <div className="border-t border-[#2E2E3B]">
              {paths.map((path) => (
                <div
                  key={path.analyzer.id}
                  className="flex items-center justify-between p-4 hover:bg-[#2E2E3B] transition-colors border-b border-[#2E2E3B] last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[#C4C4CD]">
                      <span className="truncate">{path.clientName}</span>
                      <span className="text-[#747480]">/</span>
                      <span className="truncate">{path.projectName}</span>
                    </div>
                    <div className="mt-1 text-sm text-[#747480]">
                      {path.analyzer.connectedApp}
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`
                      ${path.analyzer.status === 'active' ? 'border-[#FFE600] text-[#FFE600]' : ''}
                      ${path.analyzer.status === 'error' ? 'border-[#2E2E3B] text-[#2E2E3B]' : ''}
                      ${path.analyzer.status === 'inactive' ? 'border-[#747480] text-[#747480]' : ''}
                    `}
                  >
                    {path.analyzer.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

