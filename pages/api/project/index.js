import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt';

export default async function handle(req, res) {

    const session = await getToken({ req });
    if (session) {
        const { modules } = session;
        if (req.method === 'GET') {
            const projects = await prisma.project.findMany({
            });
            res.json(projects);
        } else
            if (req.method === 'POST') {
                const { name,
                    access,
                    description,
                    archive } = req.body;
                if (modules.includes('PROJECTS')) {
                    const upsertUser = await prisma.project.upsert({
                        where: {
                            name,
                        },
                        update: {
                            name,
                            access,
                            description,
                            archive
                        },
                        create: {
                            name,
                            access,
                            description,
                            archive
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
                        const result = await prisma.project.delete({
                            where: {
                                name,
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