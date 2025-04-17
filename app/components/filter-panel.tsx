'use client'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function FilterPanel() {
  return (
    <div className="py-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-white">Status</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" className="border-[#747480]" />
            <Label htmlFor="all" className="text-[#C4C4CD]">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="active" className="border-[#747480]" />
            <Label htmlFor="active" className="text-[#C4C4CD]">Active</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="error" id="error" className="border-[#747480]" />
            <Label htmlFor="error" className="text-[#C4C4CD]">Error</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inactive" id="inactive" className="border-[#747480]" />
            <Label htmlFor="inactive" className="text-[#C4C4CD]">Inactive</Label>
          </div>
        </RadioGroup>
      </div>
      <Separator className="bg-[#2E2E3B]" />
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-white">Connected Apps</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-apps" className="border-[#747480]" />
            <Label htmlFor="all-apps" className="text-[#C4C4CD]">All Apps</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aws" id="aws" className="border-[#747480]" />
            <Label htmlFor="aws" className="text-[#C4C4CD]">AWS CloudWatch</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="azure" id="azure" className="border-[#747480]" />
            <Label htmlFor="azure" className="text-[#C4C4CD]">Azure</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tableau" id="tableau" className="border-[#747480]" />
            <Label htmlFor="tableau" className="text-[#C4C4CD]">Tableau</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

