import React from 'react'
import { Button } from '../ui/button'

const Treasurehunts = () => {
    return (
        <section
            className="py-20 text-center bg-cover bg-center border-2 border-primary rounded-lg"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            }}
        >
            <div className="max-w-3xl mx-auto text-white">
                <h1 className='text-4xl mb-5 text-primary font-semibold uppercase'>Treasure Hunt</h1>

                <p className="mb-8 max-w-xl text-lg mx-auto">Unlock hidden deals and collect exclusive rewards by participating in our daily treasure hunt!</p>

                <Button  className='h-12 text-xl font-bold px-5'>
                    Start Hunting
                </Button>
                {/* <a
                    href="#"
                    className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition-colors"
                >
                    Start Hunting
                </a> */}
            </div>
        </section>

    )
}

export default Treasurehunts