import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

export const PaginationComponent = ({currentPage, totalPages, onPageChange}) => {
    return(
      <div className="mt-10">
        <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onPageChange(Math.max(1, currentPage - 1))
            }}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault()
                onPageChange(i + 1)
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onPageChange(Math.min(totalPages, currentPage + 1))
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
    )
}