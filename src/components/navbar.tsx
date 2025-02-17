import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="pizza-icon.svg"
            alt="Pizza slice"
            width={32}
            height={32}
            className="text-primary"
          />
          <span className="text-xl font-bold text-primary neon-glow">Pizzaroo</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/menus" className="text-foreground/80 hover:text-foreground">
            Menus
          </Link>
          <Link href="/orders" className="text-foreground/80 hover:text-foreground">
            My Orders
          </Link>
          <Link href="/cart" className="text-foreground/80 hover:text-foreground">
            Cart
          </Link>
          <Link href="/profile" className="text-foreground/80 hover:text-foreground">
            Profile
          </Link>
        </div>

        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Start Voice Order
        </Button>
      </div>
    </nav>
  )
}

