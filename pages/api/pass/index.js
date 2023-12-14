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
            if (req.method === 'POST') {
                const {  password , confirmPassword} = req.body;
                const id = session.id;
                if (password == confirmPassword) {
                  try {
                    const passwordHash = await hash(password, 12)
                    const upsertUser = await prisma.user.update({
                        where: {
                            id,
                        },
                        data: {
                            passwordHash,
                            isFirst: false
                        }, 
                        select : {id: true, fullName: true}
                    });
                    if(upsertUser)
                      res.json({success: true});
                    else {
                        res.status(400).send({ message: "Failed to upadte password"})
                    }
                  } catch (error) {
                    res.status(400).send({ message: "Failed to upadte password"})
                  }
                } else {
                    res.status(401).send({ message: 'Unauthorized' })
                }
            }
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}