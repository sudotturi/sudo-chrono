import { ClockIcon } from '@heroicons/react/24/outline';
import { Card } from 'flowbite-react';

import stopWatchIcon from "@/public/stopwatch-svgrepo-com.svg";
import Image from 'next/image';

export default function LetGetStarted() {
    return (
        <div className='flex items-center justify-center  md:relative md:top-1/4 max-md:mt-8'>
            <Card className="max-w-sm dark:bg-black ">
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <Image
                        priority
                        className='h-2/4 w-2/4'
                        src={stopWatchIcon}
                        alt="stopWatchIcon"
                    />
                    <h1 className="text-gray-700 dark:text-gray-400 font-bold text-2xl">
                        Let’s start tracking!
                    </h1>
                </div>
            </Card>
        </div>
    );
}