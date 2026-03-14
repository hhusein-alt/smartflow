"use client"
import React from 'react'
import { cn } from '@/lib/utils'

interface Logo {
  src: string
  alt: string
  gradient: { from: string; via: string; to: string }
  fallbackImage?: string
}

interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  logos: Logo[]
  speed?: 'normal' | 'slow' | 'fast'
}

const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = 'normal', className, ...props }, ref) => {
    const durationMap = { normal: '40s', slow: '80s', fast: '15s' }
    const duration = durationMap[speed]

    return (
      <>
        {/* keyframes injected directly — no tailwind config needed */}
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee-scroll ${duration} linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            'w-full rounded-xl border overflow-hidden',
            'bg-[#111F18] border-[#1D9E75]/20',
            className
          )}
          {...props}
        >
          {/* header */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 pb-6 border-b border-[#1D9E75]/15">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed self-start">
                {description}
              </p>
            </div>
          </div>

          {/* marquee container */}
          <div
            className="w-full overflow-hidden pb-6"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {/* track — logos duplicated for seamless loop */}
            <div className="marquee-track flex w-max items-center gap-4 px-4">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group relative h-20 w-36 shrink-0 flex items-center justify-center rounded-xl overflow-hidden"
                  style={{ background: '#162820', border: '1px solid rgba(29,158,117,0.15)' }}
                >
                  {/* gradient revealed on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${logo.gradient.from}, ${logo.gradient.via}, ${logo.gradient.to})`
                    }}
                  />
                  {/* logo image — fill card while keeping aspect ratio */}
                  <img
                    src={logo.src.startsWith('/') ? encodeURI(logo.src) : logo.src}
                    alt={logo.alt}
                    className="relative z-10 h-full w-full max-h-full max-w-full object-contain"
                    onError={(e) => {
                      // fallback to initials if image 404s
                      const img = e.currentTarget
                      img.style.display = 'none'
                      const fallback = img.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  {/* initials fallback */}
                  <span
                    className={cn(
                      'relative z-10 font-mono text-sm font-bold hidden items-center justify-center w-full h-full',
                      logo.fallbackImage ? 'text-transparent' : 'text-white/50'
                    )}
                    style={logo.fallbackImage ? {
                      backgroundImage: `url("${encodeURI(logo.fallbackImage)}")`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    } : undefined}
                  >
                    {logo.alt.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
)

MarqueeLogoScroller.displayName = 'MarqueeLogoScroller'
export { MarqueeLogoScroller }

