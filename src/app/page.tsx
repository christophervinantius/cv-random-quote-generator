"use client"
import { useEffect, useState } from "react"

interface Quote {
  quote: string;
  author: string;
}

const getQuote = (): Promise<Quote | null> => {
  return fetch('https://api.api-ninjas.com/v1/quotes', {
    method: 'GET',
    headers: {
      // 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY as string,
      'X-Api-Key': 'TTcF+doZy/pfgiqR/f7iJA==TLGsKJPJlTZL1jB1',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => data[0])
  .catch(error => {
    console.error('Error:', error)
    return null
  })
}

const getBackgroundColor = (): string => {
  const colors = [
    'gray',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
  ]

  return `bg-${colors[Math.floor(Math.random() * colors.length)]}-500`
}

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-red-500')
  const [fadeIn, setFadeIn] = useState<boolean>(true)

  const fetchNewQuote = () => {
    setFadeIn(false)
    getQuote().then(data => {
      setQuote(data)
      setBackgroundColor(getBackgroundColor())
      setFadeIn(true)
    })
  }

  useEffect(() => {
    fetchNewQuote()
  }, [])

  useEffect(() => {
    setBackgroundColor(getBackgroundColor())
  }, [])

  return (
    <div className={`${backgroundColor} w-full h-screen flex flex-col justify-center items-center gap-4 transition-colors duration-500`}>
      <div className={`flex justify-center items-center`}>
        {quote != null && (
          <div id="quote-box" className="max-w-lg p-8 rounded-xl bg-neutral-300 shadow-xl text-center">
            <div id="text" className={`font-bold text-xl ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              &ldquo;{quote.quote}&rdquo;
            </div>
            <div id="author" className={`mt-2 text-lg ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              {quote.author}
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <a 
                id="tweet-quote"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}`)}`}
                className={`mt-4 px-4 py-2 rounded-full bg-blue-900 hover:bg-blue-700 text-neutral-300 cursor-pointer ${fadeIn ? 'opacity-100' : 'opacity-0'} transition ease-in-out duration-500`}
              >
                Tweet Quote
              </a>
              <div 
                id="new-quote" 
                className={`mt-4 px-4 py-2 rounded-full bg-red-900 hover:bg-red-700 text-neutral-300 cursor-pointer ${fadeIn ? 'opacity-100' : 'opacity-0'} transition ease-in-out duration-500`}
                onClick={fetchNewQuote}
              >
                New Quote
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
  )
}
