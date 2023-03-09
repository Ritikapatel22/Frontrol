import { timeSince } from "../../helpers/utils"

export const SingleLogItem = ({ key, log, handleClick }) => {
    return (
        <div
            key={key}
            className={`highirse flex items-start mt-1 hover:shadow-lg cursor-pointer rounded-lg shadow-xl relative`}
            onClick={() => handleClick(log)}
        >
            <div className="pl-4 pt-2 w-full">
                <div className="pb-2" onClick={handleClick}>
                    <div className="flex items-center justify-between">
                        <h1
                            className={`${log?.hasError ? 'text-red' : ''} text-sm font-Inter font-bold cursor-pointer`}
                            onClick={() => handleClick(log)}
                        >
                            {log.data?.queryName || log.data?.url || log.data?.documentName || log.data?.name?.documentName || log?.path}
                        </h1>
                        <div className="flex text-sm relative mr-3 text-lightgrey">
                            {timeSince(log.timestamp)}
                        </div>
                    </div>
                    <div className="mt-[1px] flex justify-between items-center cursor-pointer">
                        <div className="block sm:flex items-center">
                            <p className={`${log?.hasError ? 'text-red' : ''} text-sm ml-0 mt-2 whitespace-nowrap sm:mt-0 py-1 font-Inter  rounded-[20px] text-lightgrey`}>
                                {log.action}{' '} {log?.responseTime && `(${(Number(log?.responseTime) / 1024).toFixed(2)}s)`}
                            </p>
                        </div>
                        <div className="flex text-sm relative mr-3 text-lightgrey">
                            {log.title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}