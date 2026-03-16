import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white/60">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-xl font-black">PatchUp</p>
          <p className="mt-2 text-sm text-ink/65">
            Local repair help for homes, devices, and everyday headaches.
          </p>
        </div>
        <div className="space-y-2 text-sm text-ink/70">
          <p className="font-semibold text-ink">Explore</p>
          <Link href="/how-it-works" className="block">
            How it works
          </Link>
          <Link href="/categories" className="block">
            Categories
          </Link>
        </div>
        <div className="space-y-2 text-sm text-ink/70">
          <p className="font-semibold text-ink">Built for the MVP</p>
          <p>Messaging is foundation-ready.</p>
          <p>Payouts and reviews are planned next.</p>
        </div>
      </div>
    </footer>
  );
}
