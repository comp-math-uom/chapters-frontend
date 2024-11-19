import { notFound } from 'next/navigation';

export default function Page({ params }) {

    if (params.id !== "69") {
        return notFound();
    }

    return (
        <div className="container flex flex-wrap justify-center m-auto px-20 gap-20">
            <BlogHeader
                title="Evolution of AI"
                author="S.S.Kulathunga"
                date="June 06 2024"
                likes={23}
                comments={3}
                hashtags={['history','AI','evolution']}
            />
        </div>
    );
}