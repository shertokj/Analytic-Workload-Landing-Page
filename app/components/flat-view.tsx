import { AnalyzerPath } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FlatViewProps {
  analyzers: AnalyzerPath[]
}

export function FlatView({ analyzers }: FlatViewProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-[#FFE600] hover:bg-[#FFE600]">
            <TableHead className="text-black font-bold">Analyzer</TableHead>
            <TableHead className="text-black font-bold">Client</TableHead>
            <TableHead className="text-black font-bold">Project</TableHead>
            <TableHead className="text-black font-bold">Status</TableHead>
            <TableHead className="text-black font-bold">Connected App</TableHead>
            <TableHead className="text-black font-bold">Type</TableHead>
            <TableHead className="text-black font-bold">Owner</TableHead>
            <TableHead className="text-black font-bold">Last Refresh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analyzers.map((path, index) => (
            <TableRow key={path.analyzer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <TableCell className="font-medium">
                <span className="cursor-pointer hover:underline">{path.analyzer.name}</span>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="block max-w-[150px]">
                      <span className="truncate block">
                        {path.clientName}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.clientName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="block max-w-[150px]">
                      <span className="truncate block">
                        {path.projectName}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.projectName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={`
                    ${path.analyzer.status === 'active' ? 'border-green-500 text-green-500' : ''}
                    ${path.analyzer.status === 'error' ? 'border-red-500 text-red-500' : ''}
                    ${path.analyzer.status === 'inactive' ? 'border-gray-500 text-gray-500' : ''}
                  `}
                >
                  {path.analyzer.status}
                </Badge>
              </TableCell>
              <TableCell>{path.analyzer.connectedApp}</TableCell>
              <TableCell>{path.analyzer.type}</TableCell>
              <TableCell>{path.analyzer.owner}</TableCell>
              <TableCell>{new Date(path.analyzer.lastUpdated).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

