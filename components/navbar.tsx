"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingBag, User } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navRef = useRef(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })

    tl.current.fromTo(
      ".nav-item",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
    )

    tl.current.play()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle clicks (open modal for everything except Search)
  const handleNavClick = (event: React.MouseEvent) => {
    const isSearchButton = (event.target as HTMLElement).closest("#search-button")
    if (!isSearchButton) setIsModalOpen(true)
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-xl shadow-[0_0_15px_rgba(255,0,0,0.3)]" : "bg-transparent"
        }`}
        onClick={handleNavClick} // Opens modal on click
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center nav-item">
              <img
                src="/nikeLogo.png"
                alt="Nike Logo"
                className="w-14 h-14 object-contain transition-transform duration-300 hover:scale-110"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
                New Releases
              </Link>
              <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
                Shoes
              </Link>
              <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
                Apparel
              </Link>
              <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
                Bottles
              </Link>
              <Link href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors nav-item">
                Try the AR feature
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon (Does NOT trigger modal) */}
              <Button
                id="search-button"
                variant="ghost"
                size="icon"
                className="hidden md:flex text-white hover:text-red-500 nav-item"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Other buttons (All trigger modal) */}
              <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:text-red-500 nav-item">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:text-red-500 nav-item">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-red-500 nav-item"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Login/Signup Popup (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg z-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[350px] relative">
            {/* ✅ Centered Heading */}
            <h2 className="text-lg font-semibold text-red-500 text-center">Login / Sign Up</h2>

            {/* ❌ Close button positioned separately */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white hover:text-red-500"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mt-4 space-y-4">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Login
              </Button>
              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded">
                Sign Up
              </Button>

              {/* ✅ Centered & Hidden Text Until Hover */}
              <div className="flex justify-center">
                <a href="https://loading-nike-final-repo.vercel.app/">
                  <Button className="relative w-[80%] border border-red-500 text-white py-1 px-3 rounded text-sm group hover:bg-red-500 hover:text-white">
                    <span className="opacity-100 group-hover:opacity-80 transition-opacity duration-300">
                      Sign in as Guest
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
