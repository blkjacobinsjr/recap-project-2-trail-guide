import { Request, Response } from 'express';
import * as trailModel from '../models/trailModel';
import * as regionModel from '../models/regionModel';

export async function homeHandler(req: Request, res: Response) {
    const trails = await trailModel.getAllTrails();
    res.render('index', { trails });
}

export async function trailDetailHandler(req: Request<{slug: string}>, res: Response) {
    const trail = await trailModel.getTrailBySlug(req.params.slug);
    if (!trail) return res.status(404).send('Trail not found');
    res.render('trail', { trail });
}

export async function regionsHandler(req: Request, res: Response) {
    const regions = await regionModel.getAllRegions();
    res.render('regions', { regions });
}

export async function regionDetailHandler(req: Request<{slug: string}>, res: Response) {
    const region = await regionModel.getRegionBySlug(req.params.slug);
    if (!region) return res.status(404).send('Region not found');
    const trails = await trailModel.getTrailsByRegionId(region.id);
    res.render('region', { region, trails });
}
