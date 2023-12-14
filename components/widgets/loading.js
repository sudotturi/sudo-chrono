export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <div className="lds-ring">
                <div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export function SmallSpiner({loadingText }) {
    return (
        <>
            <span className='flex justify-center  gap-2 ml-4'><span className="relative"><span className='spinner' /> <span>{loadingText}</span> </span></span>
        </>
    )
}