'use client'

import { useState, useMemo } from 'react'
import { SearchHeader } from './components/search-header'
import { FlatView } from './components/flat-view'
import { HierarchicalView } from './components/hierarchical-view'
import { mockData } from '@/lib/data'
import { type AnalyzerPath } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Flatten data for searching
const allPaths: AnalyzerPath[] = mockData.flatMap(client =>
  client.projects.flatMap(project =>
    project.analyzers.map(analyzer => ({
      clientName: client.name,
      clientId: client.id,
      projectName: project.name,
      projectId: project.id,
      analyzer,
    }))
  )
)

const connectedApps = Array.from(new Set(allPaths.map(path => path.analyzer.connectedApp)))
const analyzerTypes = Array.from(new Set(allPaths.map(path => path.analyzer.type)))

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ status: 'all', connectedApp: 'all', type: 'all' })
  const [activeView, setActiveView] = useState<'flat' | 'hierarchical'>('flat')

  const filteredResults = useMemo(() => {
    return allPaths.filter(path => {
      const matchesSearch = searchTerm === '' || 
        path.analyzer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.projectName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filters.status === 'all' || path.analyzer.status === filters.status
      const matchesApp = filters.connectedApp === 'all' || path.analyzer.connectedApp === filters.connectedApp
      const matchesType = filters.type === 'all' || path.analyzer.type === filters.type

      return matchesSearch && matchesStatus && matchesApp && matchesType
    })
  }, [searchTerm, filters])

  const handleSearch = (term: string, newFilters: typeof filters) => {
    setSearchTerm(term)
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <SearchHeader 
          onSearch={handleSearch} 
          connectedApps={connectedApps} 
          analyzerTypes={analyzerTypes}
        />
        <main className="container mx-auto py-6 px-4">
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'flat' | 'hierarchical')} className="mb-6">
            <TabsList className="bg-white mb-6">
              <TabsTrigger value="flat" className="data-[state=active]:bg-[#FFE600] data-[state=active]:text-black">Flat View</TabsTrigger>
              <TabsTrigger value="hierarchical" className="data-[state=active]:bg-[#FFE600] data-[state=active]:text-black">Hierarchical View</TabsTrigger>
            </TabsList>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <TabsContent value="flat">
                <FlatView analyzers={filteredResults} />
              </TabsContent>
              <TabsContent value="hierarchical">
                <HierarchicalView clients={mockData} />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

