'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EquipmentItem {
  id: string
  name: string
  category: string
  condition: 'excellent' | 'good' | 'fair' | 'needs-repair'
  notes?: string
  lastUsed?: string
}

export function InventoryList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")

  const equipment: EquipmentItem[] = [
    {
      id: "1",
      name: "Fender Jazz Bass",
      category: "Instruments",
      condition: "excellent",
      lastUsed: "2024-02-15",
    },
    {
      id: "2",
      name: "Ampeg SVT-4PRO",
      category: "Amplifiers",
      condition: "good",
      notes: "Needs new tubes soon",
      lastUsed: "2024-02-10",
    },
    {
      id: "3",
      name: "Shure Beta 58A",
      category: "Microphones",
      condition: "excellent",
      lastUsed: "2024-02-18",
    },
  ]

  const getConditionColor = (condition: EquipmentItem['condition']) => {
    switch (condition) {
      case 'excellent':
        return 'success'
      case 'good':
        return 'default'
      case 'fair':
        return 'warning'
      case 'needs-repair':
        return 'destructive'
    }
  }

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <Card>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Instruments">Instruments</SelectItem>
              <SelectItem value="Amplifiers">Amplifiers</SelectItem>
              <SelectItem value="Microphones">Microphones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Badge variant={getConditionColor(item.condition)}>
                    {item.condition}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.lastUsed && new Date(item.lastUsed).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.notes}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
} 