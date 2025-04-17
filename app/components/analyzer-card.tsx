import { Analyzer } from '@/lib/types'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { theme } from '@/lib/theme'

interface AnalyzerCardProps {
  analyzer: Analyzer
  clientName: string
  projectName: string
}

export function AnalyzerCard({ analyzer, clientName, projectName }: AnalyzerCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-[#2E2E3B] truncate">
              {analyzer.name}
            </h3>
            <div className="mt-1 flex flex-col gap-1">
              <p className="text-sm text-[#747480] truncate">
                {clientName} / {projectName}
              </p>
              <p className="text-sm text-[#C4C4CD]">
                {analyzer.connectedApp}
              </p>
            </div>
          </div>
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
      </CardContent>
    </Card>
  )
}

