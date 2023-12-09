import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt';

export default async function handle(req, res) {

    const session = await getToken({ req });
    if (session) {
        const { modules } = session;
        if (req.method === 'GET') {
            if (req.query.projectId) {
                const users = await prisma.user.findMany({
                    include: { projectUser: true }
                })
                const resp = users.map((user) => {
                    const body = { userId: user.id, email: user.email, fullName: user.fullName, projectAssigned: false }
                    if (user.projectUser) {
                        user.projectUser.forEach((item) => {
                            if (item.projectId == req.query.projectId) {
                                body.projectAssigned = true;
                            }
                        })
                    }
                    return body;
                })
                
                res.json(resp);
            }
        } else
            if (req.method === 'POST') {
                const { userId, projectId } = req.body;
                if (modules.includes('PROJECTS')) {
                    const projectUser = await prisma.projectUser.create({
                        data: {
                            userId,
                            projectId
                        },
                    })
                    res.json(projectUser);
                } else {
                    res.status(401).send({ message: 'Unauthorized' })
                }
            } else
                if (req.method === 'DELETE') {
                    const { userId, projectId } = req.body;
                    const projects = await prisma.projectUser.findMany({
                        where: {
                            userId,
                            projectId
                        }
                    });
                    if (!projects || projects.length == 0) {
                        res.status(401).send({ message: 'Unauthorized' })
                        return;
                    }
                    const id = projects[0].id
                    if (modules.includes('PROJECTS')) {
                        const result = await prisma.projectUser.delete({
                            where: {
                                id
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