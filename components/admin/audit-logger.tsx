"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download, Loader2 } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface AuditLog {
  id: string
  timestamp: string
  action: string
  severity: string
  message: string
  user: string
}

const AuditLogger = () => {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [filters, setFilters] = useState({
    action: "",
    severity: "",
    startDate: "",
    endDate: "",
    search: "",
  })
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
    setCurrentPage(1)
  }

  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date)
    setFilters((prev) => ({
      ...prev,
      startDate: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      endDate: date?.to ? format(date.to, "yyyy-MM-dd") : "",
    }))
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleExportLogs = async () => {
    setExporting(true)

    try {
      const queryParams = new URLSearchParams({
        action: filters.action,
        severity: filters.severity,
        startDate: filters.startDate,
        endDate: filters.endDate,
        search: filters.search,
      })

      const response = await fetch(`/api/admin/audit-logs/export?${queryParams}`)

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Failed to export logs:", error)
      alert("Failed to export logs. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  const fetchLogs = async () => {
    setLoading(true)

    try {
      const queryParams = new URLSearchParams({
        action: filters.action,
        severity: filters.severity,
        startDate: filters.startDate,
        endDate: filters.endDate,
        search: filters.search,
        page: currentPage.toString(),
        limit: "50",
      })

      const response = await fetch(`/api/admin/audit-logs?${queryParams}`)

      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs)
        setTotalPages(Math.ceil(data.total / 50))
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error)
    } finally {
      setLoading(false)
    }
  }

  // Add useEffect to fetch logs when filters change
  useEffect(() => {
    fetchLogs()
  }, [filters, currentPage])

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <Label htmlFor="action">Action:</Label>
          <Select
            name="action"
            onValueChange={(value) => handleFilterChange({ target: { name: "action", value } } as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="severity">Severity:</Label>
          <Select
            name="severity"
            onValueChange={(value) => handleFilterChange({ target: { name: "severity", value } } as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Date Range:</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-[280px] justify-start text-left font-normal", !date?.from && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    `${format(date.from, "LLL dd, yyyy")} - ${format(date.to, "LLL dd, yyyy")}`
                  ) : (
                    format(date.from, "LLL dd, yyyy")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={2}
                pagedNavigation
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="search">Search:</Label>
          <Input
            type="search"
            id="search"
            name="search"
            placeholder="Search..."
            className="w-[280px]"
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <Label>&nbsp;</Label>
          <Button variant="outline" onClick={handleExportLogs} disabled={exporting}>
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table>
            <TableCaption>A list of your recent audit logs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.severity}</TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} active={currentPage === page}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page)}
                    isCurrent={currentPage === page}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  )
}

export default AuditLogger
