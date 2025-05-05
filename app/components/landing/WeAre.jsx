import React from "react";
import Image from "next/image";

function WeAre() {
    return (
        <div className="w-full bg-black text-white rounded-3xl p-12 my-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="w-full md:w-1/2">
                    <h2 className="text-6xl font-bold mb-6">WE ARE</h2>
                    <p className="text-lg">
                        As the B.Sc. Hons in Artificial Intelligence cohort at the
                        University of Moratuwa, we embrace the opportunity to
                        lead and innovate. We established this platform as a
                        space to showcase our abilities, foster learning, and
                        build a lasting resource for the AI community in Sri Lanka
                        and beyond. We are driven by intellectual curiosity and
                        the commitment to excellence.
                    </p>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="bg-white p-6 rounded-3xl w-full max-w-md">
                        <Image
                            width="429"
                            height="303"
                            src={'/img/weare.png'}
                            alt="AI Students Illustration"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeAre;