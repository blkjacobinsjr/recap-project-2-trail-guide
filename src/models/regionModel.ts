import { getDB } from './db';

export async function getAllRegions() {
    const db = getDB();
    return db.all('SELECT * FROM regions ORDER BY name ASC');
}

export async function getRegionBySlug(slug: string) {
    const db = getDB();
    return db.get('SELECT * FROM regions WHERE slug = ?', [slug]);
}
