"use client"

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { cn } from "@/lib/utils"

interface GalleryItem {
    imageUrl: string;
    productSlug?: string;
}

interface GridMotionProps {
    /**
     * Array of items to display in the grid - can be strings, ReactNodes, or GalleryItems
     */
    items?: (string | ReactNode | GalleryItem)[]
    /**
     * Color for the radial gradient background
     */
    gradientColor?: string
    /**
     * Additional CSS classes
     */
    className?: string
    /**
     * Click handler for items (only called for GalleryItem objects)
     */
    onItemClick?: (item: GalleryItem) => void
}

export function GridMotion({
    items = [],
    gradientColor = 'black',
    className,
    onItemClick
}: GridMotionProps) {
    const gridRef = useRef<HTMLDivElement>(null)
    const rowRefs = useRef<(HTMLDivElement | null)[]>([])
    const scrollYRef = useRef(0)

    const totalItems = 28
    const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`)
    const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems

    useEffect(() => {
        if (typeof window === 'undefined') return

        gsap.ticker.lagSmoothing(0)

        const handleScroll = () => {
            scrollYRef.current = window.scrollY
        }

        const updateMotion = () => {
            const maxMoveAmount = 300
            const baseDuration = 0.8
            const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1
                    // Use scroll position to calculate movement
                    const scrollProgress = (scrollYRef.current % 1000) / 1000 // Normalize scroll to 0-1
                    const moveAmount = (scrollProgress * maxMoveAmount - maxMoveAmount / 2) * direction

                    gsap.to(row, {
                        x: moveAmount,
                        duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
                        ease: 'power3.out',
                        overwrite: 'auto',
                    })
                }
            })
        }

        const removeAnimationLoop = gsap.ticker.add(updateMotion)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            removeAnimationLoop()
        }
    }, [])

    return (
        <div className={cn("h-full w-full overflow-hidden", className)} ref={gridRef}>
            <section
                className="relative flex h-screen w-full items-center justify-center overflow-hidden"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
                }}
            >
                <div className="relative z-2 flex-none grid h-[120vh] w-[120vw] gap-2 md:gap-4 grid-rows-[repeat(4,1fr)] grid-cols-[100%] -rotate-12 md:-rotate-15 origin-center max-w-full">
                    {[...Array(4)].map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="grid gap-2 md:gap-4 grid-cols-[repeat(7,1fr)] will-change-transform will-change-filter"
                            ref={(el) => {
                                rowRefs.current[rowIndex] = el
                            }}
                        >
                            {[...Array(7)].map((_, itemIndex) => {
                                const content = combinedItems[rowIndex * 7 + itemIndex]
                                const isGalleryItem = content && typeof content === 'object' && 'imageUrl' in content
                                const isClickable = isGalleryItem && onItemClick

                                return (
                                    <div
                                        key={itemIndex}
                                        className={`relative ${isClickable ? 'cursor-pointer group' : ''}`}
                                        onClick={() => {
                                            if (isGalleryItem && onItemClick) {
                                                onItemClick(content as GalleryItem)
                                            }
                                        }}
                                    >
                                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center text-foreground text-xl">
                                            {isGalleryItem ? (
                                                <>
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                                        style={{
                                                            backgroundImage: `url(${(content as GalleryItem).imageUrl})`,
                                                        }}
                                                    />
                                                    {isClickable && (
                                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <div className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">
                                                                View Product
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : typeof content === 'string' && content.startsWith('http') ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url(${content})`,
                                                    }}
                                                />
                                            ) : (
                                                <div className="p-4 text-center z-1">
                                                    {content}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
                <div className="relative pointer-events-none h-full w-full inset-0">
                    <div className="rounded-none" />
                </div>
            </section>
        </div>
    )
}