import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt';

export default async function handle(req, res) {

    const session = await getToken({ req });
    if (session) {
        const { modules } = session;
        if (req.method === 'GET') {
            if (req.query.forTrack && req.query.forTrack == 'true') {
                const userId = session.id;
                const projects = await prisma.project.findMany({
                    where: {
                        OR: [{
                            projectUser: {
                                some: {
                                    userId
                                }
                            }
                        }, { access: 'Public' }], deleted: false, archive: false
                    }
                });
                res.json(projects);
                return;
            }
            const projects = await prisma.project.findMany({
                where : {deleted:false}
            });
            res.json(projects);
        } else
            if (req.method === 'POST') {
                const { name,
                    access,
                    description,
                    archive, color } = req.body;
                if (modules.includes('PROJECTS')) {
                    const upsertUser = await prisma.project.upsert({
                        where: {
                            name,
                        },
                        update: {
                            name,
                            access,
                            description,
                            archive,
                            color
                        },
                        create: {
                            name,
                            access,
                            description,
                            archive,
                            color
                        },
                    })
                    res.json(upsertUser);
                } else {
                    res.status(401).send({ message: 'Unauthorized' })
                }
            } else
                if (req.method === 'DELETE') {
                    const { name } = req.body;
                    if (modules.includes('PROJECTS')) {
                        const result = await prisma.project.update({
                            where: {
                                name,
                            }, data: { deleted: true}
                        });
                        res.json(result);
                    } else
                        res.status(401).send({ message: 'Unauthorized' })
                } else res.status(401).send({ message: 'Unauthorized' })
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}