import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt';
import { getLastWeekDates, formatDateToCustomString, darkenColor } from '@/utils/constants';
export default async function handle(req, res) {

    const session = await getToken({ req });
    if (session) {
        const { modules } = session;
        if (req.method === 'GET') {
            if (req.query.chart && req.query.chart == 'doughnut') {
                const userId = session.id;
                const byTeam = req.query.team;
                const where = byTeam == 'true'? {}: { userId };
                const track = await prisma.track.findMany({
                    where , include: { project: true }, orderBy:{
                        startDate: 'asc'
                    }
                });

                const labels = {}
                const dateData = getLastWeekDates();

                track.map((rec)=>{
                    const timeDifferenceMs =  rec.endDate - rec.startDate;
                    if(!labels.hasOwnProperty(rec.project.name)){
                      labels[rec.project.name] = {'tat': 0,label: rec.project.name,
                      data: dateData.map((i)=> {return 0}) ,
                      backgroundColor: rec.project.color,
                      borderColor: darkenColor(rec.project.color, 0.2)}
                    }
                    let thatProject = labels[rec.project.name];
                    let tat = Number(thatProject['tat']) + Number((timeDifferenceMs / (1000 * 60 * 60)).toFixed(2));
                    thatProject['tat'] = Math.abs(tat);
                    const index = dateData.indexOf(formatDateToCustomString(rec.startDate));
                    if(index)
                    thatProject['data'][index] =  Math.abs(Number((timeDifferenceMs / (1000 * 60 * 60)).toFixed(2)));
                    labels[rec.project.name] = thatProject;
                })
                res.json({labels, track});
                return;
            }
        } 
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
}