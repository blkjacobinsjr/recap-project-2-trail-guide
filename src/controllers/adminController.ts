import { Request, Response } from 'express';
import * as trailModel from '../models/trailModel';

export async function deleteTrailHandler(req: Request, res: Response) {
    const { id } = req.params;
    await trailModel.deleteTrail(Number(id));
    res.redirect('/admin');
}
