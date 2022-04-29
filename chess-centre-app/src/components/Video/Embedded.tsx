export default function Embedded() {
    return (<div className="relative max-w-6xl mx-auto px-4 sm:px-28" >
        <div className="pt-4 pb-0 sm:py-10" >
            <div className="aspect-w-16 aspect-h-9" >
                <iframe
                    src={`https://www.youtube.com/embed/FYG4Envbzro`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        </div>
    </div>)
}