import { SearchUser } from "@/services/github/search"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setHistoryLocalStorage = (history: SearchUser) => {
  const lastHistory = JSON.parse(localStorage?.getItem('history') || '[]')
  const id = lastHistory.length > 0 ? lastHistory[0].id + 1 : 1
  const newHistory = [{ history, date: new Date(), id }, ...lastHistory]
  localStorage.setItem('history', JSON.stringify(newHistory))
}

export function normalizeLink(link: string) {
  link = link.trim();
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  if (link.startsWith("www.")) {
    return "//" + link;
  }
  return "//" + link;
}