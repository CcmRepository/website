// Default nav pages used as a fallback before the `nav_items` migration has
// been run (so the header keeps working). Home is always shown separately.
export const DEFAULT_NAV = [
    { key: 'shop', label: 'Shop', href: '/shop', enabled: true, position: 1 },
    { key: 'portfolio', label: 'Portfolio', href: '/portfolio', enabled: true, position: 2 },
    { key: 'book-online', label: 'Book Online', href: '/book-online', enabled: true, position: 3 },
];

// Returns ALL nav items (both enabled and disabled), ordered by position.
// The header filters to enabled ones; the admin page needs all of them.
export async function getNavItems(supabase) {
    const { data, error } = await supabase
        .from('nav_items')
        .select('key, label, href, enabled, position')
        .order('position', { ascending: true });

    if (error || !data || data.length === 0) {
        return DEFAULT_NAV;
    }

    return data;
}
