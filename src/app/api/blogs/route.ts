import { NextResponse } from "next/server"
import Parser from "rss-parser"

export const GET = async () => {

   const parser = new Parser()

   const data = await parser.parseURL("https://medium.com/feed/@rifkiaf")
   
   const posts = data.items.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
   })).slice(0,3)

   return NextResponse.json(posts)
}