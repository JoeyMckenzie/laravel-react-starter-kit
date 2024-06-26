import {
    Pagination,
    PaginationContent,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginatedModel, Todo } from "@/lib/models";
import React from "react";

export function TodoPagination(todos: PaginatedModel<Todo>) {
    const previousPage = todos.current_page === 1 ? 1 : todos.current_page - 1;
    const nextPage =
        todos.current_page === todos.last_page
            ? todos.last_page
            : todos.current_page + 1;
    const nextPageAvailable = todos.current_page < todos.last_page;
    const previousPageAvailable = todos.current_page > 1;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="flex flex-row items-center">
                    <PaginationFirst
                        as="button"
                        preserveScroll
                        disabled={!previousPageAvailable}
                        href={route("todos.index", {
                            page: 1,
                        })}
                    />
                    <PaginationPrevious
                        as="button"
                        preserveScroll
                        disabled={!previousPageAvailable}
                        href={route("todos.index", {
                            page: previousPage,
                        })}
                    />
                </PaginationItem>
                <div className="hidden sm:flex sm:flex-row">
                    {previousPageAvailable && (
                        <PaginationItem>
                            <PaginationLink
                                className="text-neutral-500"
                                preserveScroll
                                href={route("todos.index", {
                                    page: previousPage,
                                })}
                            >
                                {previousPage}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink
                            isActive
                            preserveScroll
                            href={route("todos.index", {
                                page: todos.current_page,
                            })}
                        >
                            {todos.current_page}
                        </PaginationLink>
                    </PaginationItem>
                    {nextPageAvailable && (
                        <PaginationItem>
                            <PaginationLink
                                preserveScroll
                                className="text-neutral-500"
                                href={route("todos.index", {
                                    page: nextPage,
                                })}
                            >
                                {nextPage}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                </div>
                <PaginationItem>
                    <PaginationNext
                        as="button"
                        disabled={!nextPageAvailable}
                        preserveScroll
                        href={route("todos.index", { page: nextPage })}
                    />
                    <PaginationLast
                        as="button"
                        disabled={!nextPageAvailable}
                        preserveScroll
                        href={route("todos.index", { page: todos.last_page })}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
