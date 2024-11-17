import BlogHeader from "@/app/components/blog/BlogHeader";

export default function Page() {
    return (
        <div className="container flex flex-wrap justify-center m-auto px-20 gap-20">
            <BlogHeader
                title="Evolution of AI"
                author="S.S.Kulathunga"
                date="June 06 2024"
                info="AI evolution"
                likes={23}
                comments={3}
            />
        </div>
    );
}