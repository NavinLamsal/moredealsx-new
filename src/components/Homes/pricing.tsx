import Link from "next/link";

// components/PremiumSection.tsx
export default function PremiumSection() {
    return (
      <section
        id="premium"
        className="py-20 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-4">PREMIUM PRODUCTS</h2>
            <p className="text-lg mb-10">
              ELEVATE YOUR SAVINGS – MORE DEALSX PREMIUM
            </p>
  
            <div className="grid gap-8 sm:grid-cols-2  mb-10">
              <div className="bg-yellow-100/10 border border-yellow-400 rounded-lg p-6 text-white text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-yellow-400 text-xl font-semibold mb-2">
                  Early Access
                </h3>
                <p>Be the first to grab deals before they sell out</p>
              </div>
  
              <div className="bg-yellow-100/10 border border-yellow-400 rounded-lg p-6 text-white text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-yellow-400 text-xl font-semibold mb-2">
                  Extra Discounts
                </h3>
                <p>Additional 10% off all partner offers</p>
              </div>
  
              <div className="bg-yellow-100/10 border border-yellow-400 rounded-lg p-6 text-white text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-yellow-400 text-xl font-semibold mb-2">
                  VIP Treatment
                </h3>
                <p>Exclusive perks at premium partners</p>
              </div>
            </div>
  
            <div>
              <Link
                href="/login"
                className="inline-block bg-primary hover:bg-yellow-500 text-black font-semibold text-lg px-10 py-4 rounded-sm transition duration-300"
              >
                Join Premium Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  