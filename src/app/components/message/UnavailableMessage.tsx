"use client";

interface UnavailableMessageProps {
    title: string;
    message:string;
    image: string;
}

export default function KwlUnavailablePage({ message, image, title }: UnavailableMessageProps){
    const goBack = () => {
        window.history.back();
    };

    return(
        <main>
            <div className="pt-5 flex flex-col items-center justify-center">

                <div className="w-[50%] md:w-[70%] lg:w-[300px]">
                    <img src={image}/>
                </div>

                <h1 className="font-bold text-lg mt-10 m-2">{title}</h1>
                <span className="mx-4 mt-4 mb-8 text-center">
                    {message} <br/>
                </span>

                <button onClick={goBack} className='text-sm text-white font-bold w-[120px] py-2 px-6 mt-4 shadow text-center bg-green-500 rounded'>
                    kembali
                </button> 


            </div>
        </main>
    );
};