import { Client } from './types'

const analyzerNames = [
  'Revenue Analyzer', 'Cost Analyzer', 'Profit Margin Analyzer', 'Cash Flow Analyzer',
  'Inventory Analyzer', 'Sales Performance Analyzer', 'Customer Segmentation Analyzer',
  'Market Trend Analyzer', 'Risk Assessment Analyzer', 'Compliance Analyzer',
  'Operational Efficiency Analyzer', 'Supply Chain Analyzer', 'Product Performance Analyzer',
  'Employee Productivity Analyzer', 'Customer Satisfaction Analyzer'
]

const connectedApps = [
  'AWS CloudWatch', 'Azure Monitor', 'Google Cloud Monitoring', 'Tableau',
  'Power BI', 'Splunk', 'Datadog', 'New Relic', 'Grafana', 'Kibana'
]

const analyzerTypes = [
  'Financial', 'Operational', 'Marketing', 'Sales', 'HR', 'Supply Chain', 'Customer'
]

const owners = [
  'John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams', 'Charlie Brown',
  'Diana Davis', 'Edward Evans', 'Fiona Foster', 'George Green', 'Hannah Hill'
]

function generateAnalyzers(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `analyzer-${Math.random().toString(36).substr(2, 9)}`,
    name: analyzerNames[Math.floor(Math.random() * analyzerNames.length)],
    status: ['active', 'error', 'inactive'][Math.floor(Math.random() * 3)] as 'active' | 'error' | 'inactive',
    connectedApp: connectedApps[Math.floor(Math.random() * connectedApps.length)],
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    owner: owners[Math.floor(Math.random() * owners.length)],
    type: analyzerTypes[Math.floor(Math.random() * analyzerTypes.length)],
    description: `This is a ${analyzerTypes[Math.floor(Math.random() * analyzerTypes.length)]} analyzer that helps with various business metrics and KPIs.`
  }))
}

function generateProjects(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `project-${Math.random().toString(36).substr(2, 9)}`,
    name: `Project ${String.fromCharCode(65 + i)}`,
    analyzers: generateAnalyzers(Math.floor(Math.random() * 5) + 1)
  }))
}

export const mockData: Client[] = Array.from({ length: 50 }, (_, i) => ({
  id: `client-${Math.random().toString(36).substr(2, 9)}`,
  name: `Client ${i + 1}`,
  projects: generateProjects(Math.floor(Math.random() * 10) + 1)
}))

