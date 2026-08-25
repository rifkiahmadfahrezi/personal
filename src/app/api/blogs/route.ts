import { NextResponse } from "next/server"
import Parser from "rss-parser"

export const GET = async () => {
  const parser = new Parser()

  const response = await fetch("https://medium.com/feed/@rifkiaf")

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Medium RSS: ${response.status} ${response.statusText}`
    )
  }

  const xml = await response.text()

  const data = await parser.parseString(xml)

  const posts = data.items
    .map((item) => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
    }))
    .slice(0, 3)

  return NextResponse.json(posts)
}