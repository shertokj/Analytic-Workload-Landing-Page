'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FilterComponent() {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    connectedApp: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search clients, projects, or analyzers"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="connectedApp">Connected App</Label>
          <Input
            id="connectedApp"
            placeholder="Filter by connected app"
            value={filters.connectedApp}
            onChange={(e) => handleFilterChange('connectedApp', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

