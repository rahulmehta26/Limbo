import React from 'react';

const RecentCrashes = ({ crashHistory = "0" }) => {
    return (
        <div className="md:absolute top-2 right-0">
            {crashHistory.length > 0 && (
                <div>
                    <h2 className=' text-start md:text-end p-2 '  >Recent Crashes</h2>

                    <div className="flex flex-wrap px-2 gap-2">
                        {crashHistory.map((crash, index) => (
                            <div key={index} className={`border-[0.1rem] px-1 py-0.5 md:px-2 md:py-[0.05rem] text-xs md:text-[0.9rem] lg:text-base bg-transparent font-semibold rounded-lg ${!crash?.won ? "border-red-500 text-red-500" : "border-green-600 text-green-600"} `}>
                                {crash?.crashMultiplier?.toFixed(2)}x

                                { console.log(crash?.crashMultiplier?.toFixed(2)) }

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentCrashes;
