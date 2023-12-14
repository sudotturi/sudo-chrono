import prisma from '@/lib/prisma'
import { ROLES } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { hash } from "bcryptjs";

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
                const { email, phoneNumber, username, id, fullName, gender, roles, isActive, isLocked, password } = req.body;
                
                if (roles != ROLES.SUPER_ADMIN) {
                  try {
                    const passwordHash = await hash(password, 12)
                    const upsertUser = await prisma.user.upsert({
                        where: {
                            id,
                        },
                        update: {
                            email,
                            username,
                            phoneNumber,
                            passwordHash, // test
                            fullName,
                            gender,
                            roles,
                            isActive, isLocked
                        },
                        create: {
                            email,
                            username,
                            phoneNumber,
                            passwordHash,
                            fullName,
                            gender,
                            roles,
                            isActive, isLocked
                        },
                    });
                    if(upsertUser)
                      res.json(upsertUser);
                    else {
                        res.status(400).send({ message: "Username or email already exists. Please choose a different one."})
                    }
                  } catch (error) {
                    res.status(400).send({ message: "Username or email already exists. Please choose a different one."})
                  }
                } else {
                    res.status(401).send({ message: 'Unauthorized' })
                }
            } else
                if (req.method === 'DELETE') {
                    const { username, roles , userId } = req.body;
                   
                    if (roles != ROLES.SUPER_ADMIN) {
                        try {
                       const ff = await prisma.track.deleteMany({
                                where: {
                                    userId,
                                }
                            });
                        const result = await prisma.user.delete({
                            where: {
                                username,
                            }
                        });
                        res.json(result);
                    } catch (error) {
                        res.status(400).send({ message: "Please delete the dependent data first"})
                      }
                    } else
                        res.status(401).send({ message: 'Unauthorized' })
                } else res.status(401).send({ message: 'Unauthorized' })
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}