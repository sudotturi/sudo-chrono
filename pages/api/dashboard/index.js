import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt';

export default async function handle(req, res) {

    const session = await getToken({ req });
    if (session) {
        const { modules } = session;
        if (req.method === 'GET') {
            if (req.query.chart && req.query.chart == 'doughnut') {
                const userId = session.id;
                const track = await prisma.track.findMany({
                    where: { userId }, include: { project: true }
                });
                const labels = {}
                track.map((rec)=>{
                    const timeDifferenceMs =  rec.endDate - rec.startDate;
                    if(!labels.hasOwnProperty(rec.project.name)){
                      labels[rec.project.name] = 0
                    }
                    labels[rec.project.name] = Number(labels[rec.project.name]) + Number((timeDifferenceMs / (1000 * 60 * 60)).toFixed(2));
                })
                
                res.json(labels);
                return;
            }
        } 
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}