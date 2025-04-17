export interface Analyzer {
  id: string
  name: string
  status: 'active' | 'error' | 'inactive'
  connectedApp: string
  lastUpdated: string
  owner: string
  type: string
  description: string
}

export interface Project {
  id: string
  name: string
  analyzers: Analyzer[]
}

export interface Client {
  id: string
  name: string
  projects: Project[]
}

export interface AnalyzerPath {
  clientName: string
  clientId: string
  projectName: string
  projectId: string
  analyzer: Analyzer
}

