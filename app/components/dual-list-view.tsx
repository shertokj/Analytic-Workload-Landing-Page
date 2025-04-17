'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlatList } from './flat-list'
import { HierarchicalList } from './hierarchical-list'

export function DualListView() {
  const [activeView, setActiveView] = useState<'flat' | 'hierarchical'>('flat')

  return (
    <Tabs defaultValue="flat" className="w-full" onValueChange={(value) => setActiveView(value as 'flat' | 'hierarchical')}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="flat">Flat List</TabsTrigger>
        <TabsTrigger value="hierarchical">Hierarchical List</TabsTrigger>
      </TabsList>
      <TabsContent value="flat">
        <FlatList />
      </TabsContent>
      <TabsContent value="hierarchical">
        <HierarchicalList />
      </TabsContent>
    </Tabs>
  )
}

