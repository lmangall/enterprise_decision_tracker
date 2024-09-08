'use client'

import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DecisionTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Goal Met</TableHead>
          <TableHead>Goal Date</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-5 w-5 rounded-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}