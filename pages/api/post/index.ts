import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import { Gender, ROLES } from '@prisma/client';
import { getToken } from 'next-auth/jwt';


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { email, phone, username, name, gender, role } = req.body;
    console.log(req.body);
    const session = await getToken({ req });
    console.log(req.body);
    if (session) {
        console.log(req.body);
        const result = await prisma.user.create({
            data: {
                email,
                username,
                phoneNumber: phone,
                passwordHash: '$2a$12$rq6BZ0NNJTcg9Ma.WuTxa.JYgtUYZUg5Ex0NcIkpzpc7n/KL1OPXu', // test
                fullName: name,
                gender: gender,
                roles: role,
            },
        });
        console.log(req.body);
        res.json(result);
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}