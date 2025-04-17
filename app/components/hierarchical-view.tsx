'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Client, Project, Analyzer } from '@/lib/types'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HierarchicalViewProps {
  clients: Client[]
}

export function HierarchicalView({ clients }: HierarchicalViewProps) {
  const [expandedClient, setExpandedClient] = useState<string | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [showAllClients, setShowAllClients] = useState(true)

  useEffect(() => {
    if (showAllClients) {
      setExpandedClient(null)
    }
  }, [showAllClients])

  const toggleClient = (clientId: string) => {
    setExpandedClient(prev => prev === clientId ? null : clientId)
    setShowAllClients(false)
  }

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev)
      if (next.has(projectId)) {
        next.delete(projectId)
      } else {
        next.add(projectId)
      }
      return next
    })
  }

  const toggleAllClients = () => {
    setShowAllClients(prev => !prev)
  }

  const renderAnalyzer = (analyzer: Analyzer) => (
    <div key={analyzer.id} className="ml-8 mb-2 p-3 bg-white rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium cursor-pointer hover:underline">{analyzer.name}</span>
        <Badge 
          variant="outline"
          className={`
            ${analyzer.status === 'active' ? 'border-green-500 text-green-500' : ''}
            ${analyzer.status === 'error' ? 'border-red-500 text-red-500' : ''}
            ${analyzer.status === 'inactive' ? 'border-gray-500 text-gray-500' : ''}
          `}
        >
          {analyzer.status}
        </Badge>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        <p>Type: {analyzer.type}</p>
        <p>Connected App: {analyzer.connectedApp}</p>
        <p>Owner: {analyzer.owner}</p>
        <p>Last Refresh: {new Date(analyzer.lastUpdated).toLocaleDateString()}</p>
      </div>
    </div>
  )

  const renderProject = (project: Project) => (
    <div key={project.id} className="ml-4 mb-2">
      <button
        onClick={() => toggleProject(project.id)}
        className="flex items-center text-left w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
      >
        {expandedProjects.has(project.id) ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
        <span className="font-medium">{project.name}</span>
      </button>
      {expandedProjects.has(project.id) && (
        <div className="mt-2 pl-4 border-l-2 border-gray-300">
          {project.analyzers.map(renderAnalyzer)}
        </div>
      )}
    </div>
  )

  const renderClient = (client: Client) => (
    <div key={client.id} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => toggleClient(client.id)}
        className="flex items-center text-left w-full p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      >
        {expandedClient === client.id ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
        <span className="font-semibold text-gray-800">{client.name}</span>
      </button>
      {expandedClient === client.id && (
        <div className="p-4">
          {client.projects.map(renderProject)}
        </div>
      )}
    </div>
  )

  return (
    <div>
      <Button onClick={toggleAllClients} className="mb-4 bg-[#FFE600] text-black hover:bg-[#FFD600]">
        {showAllClients ? "Hide All Clients" : "Show All Clients"}
      </Button>
      <div className="space-y-4">
        {clients.map(client => (showAllClients || expandedClient === client.id) && renderClient(client))}
      </div>
    </div>
  )
}

