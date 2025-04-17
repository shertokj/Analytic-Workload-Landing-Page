'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchHeaderProps {
  onSearch: (term: string, filters: { status: string, connectedApp: string, type: string }) => void
  connectedApps: string[]
  analyzerTypes: string[]
}

export function SearchHeader({ onSearch, connectedApps, analyzerTypes }: SearchHeaderProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('all')
  const [connectedApp, setConnectedApp] = useState('all')
  const [type, setType] = useState('all')

  const handleSearch = () => {
    onSearch(searchTerm, { status, connectedApp, type })
  }

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search analyzers..." 
              className="pl-10 border-gray-300"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={connectedApp} onValueChange={setConnectedApp}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Connected App" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Apps</SelectItem>
              {connectedApps.map(app => (
                <SelectItem key={app} value={app}>{app}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Analyzer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {analyzerTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="bg-[#FFE600] text-black hover:bg-[#FFD600]">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

