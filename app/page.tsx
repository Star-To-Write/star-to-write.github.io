// DISCLAIMER!!!!!!!!
// this is heavily based on the system from the figma julia had sent, hence the disgusting amount of components.
// while yes, i did modify it heavily also so that it would work, the structure is basically the same as the figma so if the
// organization is SHIT DONT BLAME ME PLS 😇

import { AboutUs } from "@/components/AboutUs";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { DontGo } from "@/components/DontGo";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { RecentPosts } from "@/components/RecentPosts";
import { SubscribeCard } from "@/components/SubscribeCard";

export default async function Home() {
    return (
        <div>
            <SubscribeCard />
            <FeaturedArticle />
            <CategoryShowcase />
            <AboutUs />
            <RecentPosts />
            <DontGo />
        </div>
    );
}
