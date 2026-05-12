import { getDB } from './db';

const TRAIL_JOIN_QUERY = `
    SELECT trails.*, regions.name as region_name, regions.country as region_country, regions.slug as region_slug 
    FROM trails 
    INNER JOIN regions ON trails.region_id = regions.id
`;

export async function getAllTrails() {
    const db = getDB();
    return db.all(`${TRAIL_JOIN_QUERY} ORDER BY trails.created_at DESC`);
}

export async function getTrailBySlug(slug: string) {
    const db = getDB();
    return db.get(`${TRAIL_JOIN_QUERY} WHERE trails.slug = ?`, [slug]);
}

export async function getTrailsByRegionId(regionId: number) {
    const db = getDB();
    return db.all(`${TRAIL_JOIN_QUERY} WHERE trails.region_id = ? ORDER BY trails.title ASC`, [regionId]);
}

export async function deleteTrail(id: number) {
    const db = getDB();
    return db.run('DELETE FROM trails WHERE id = ?', [id]);
}
