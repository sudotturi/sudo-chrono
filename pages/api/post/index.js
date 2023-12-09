import prisma from '@/lib/prisma'
import { ROLES } from '@prisma/client';
import { getToken } from 'next-auth/jwt';


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {

    const session = await getToken({ req });
    if (session) {
        if (req.method === 'GET') {
            if (req.query.withAssign && req.query.withAssign == 'true') {
                const users = await prisma.user.findMany({
                    include: {projectUser: true}
                });
                res.json(users);
            }
            else {
                const users = await prisma.user.findMany({
                });
                res.json(users);
            }
        } else
            if (req.method === 'POST') {
                const { email, phoneNumber, username, fullName, gender, roles, isActive, isLocked } = req.body;
                if (roles != ROLES.SUPER_ADMIN) {
                    const upsertUser = await prisma.user.upsert({
                        where: {
                            username,
                        },
                        update: {
                            email,
                            username,
                            phoneNumber,
                            passwordHash: '$2a$12$rq6BZ0NNJTcg9Ma.WuTxa.JYgtUYZUg5Ex0NcIkpzpc7n/KL1OPXu', // test
                            fullName,
                            gender,
                            roles,
                            isActive, isLocked
                        },
                        create: {
                            email,
                            username,
                            phoneNumber,
                            passwordHash: '$2a$12$rq6BZ0NNJTcg9Ma.WuTxa.JYgtUYZUg5Ex0NcIkpzpc7n/KL1OPXu', // test
                            fullName,
                            gender,
                            roles,
                            isActive, isLocked
                        },
                    })
                    res.json(upsertUser);
                } else {
                    res.status(401).send({ message: 'Unauthorized' })
                }
            } else
                if (req.method === 'DELETE') {
                    const { username, roles } = req.body;
                    if (roles != ROLES.SUPER_ADMIN) {
                        const result = await prisma.user.delete({
                            where: {
                                username,
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