import prisma from '@/lib/prisma'
import { ROLES } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

export default async function handle(req, res) {
    const session = await getToken({ req });
    if (session) {
        const { modules } = session;
        const userId = session.id;
        if (req.method === 'GET') {
            const track = await prisma.track.findMany({
                where: { userId }, include: { project: true }
            });
            res.json(track);
        } else
            if (req.method === 'POST') {
                const {
                    id,
                    startDate,
                    description,
                    endDate, projectId } = req.body;

                if (modules.includes('TRACKING')) {
                    const tracking = await prisma.track.upsert({
                        where: {
                            id,
                        },
                        update: {
                            startDate,
                            endDate,
                            description,
                            projectId,
                            userId
                        },
                        create: {
                            startDate,
                            endDate,
                            description,
                            projectId,
                            userId
                        },
                    })
                    res.json(tracking);
                } else {
                    res.status(401).send({ message: 'Unauthorized' })
                }
            } else
                if (req.method === 'DELETE') {
                    const { id } = req.body;
                    console.log(id)
                    if (modules.includes('TRACKING')) {
                        const result = await prisma.track.delete({
                            where: {
                                id,
                            }
                        });
                        res.json(result);
                    } else
                        res.status(401).send({ message: 'Unauthorized' })
                } else res.status(401).send({ message: 'Unauthorized' })
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}