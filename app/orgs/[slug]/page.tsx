import { client } from "@/sanity/lib/client";
import { type Organization } from "@/lib/types";
import { organizationSubjects } from "@/lib/organizationSubjects";
import OrganizationsClient from "@/components/OrganizationsClient";

interface OrganizationPageProps {
    params: { slug: string };
}

export default async function OrganizationPage({
    params,
}: OrganizationPageProps) {
    const submissionsQuery = `
        *[_type == "organization"]{
          _id,
          name,
          "slug": slug.current,
          "logo": logo.asset->url,
          "location": { "country": location, state },
          subject,
          description,
          involvement,
          goal,
          scope,
          "openRoles": roles,
          "applicationLink": link,
          socials
        }`;

    const organizations: Organization[] = await client.fetch(submissionsQuery);

    return (
        <div className="min-h-screen p-12">
            <OrganizationsClient
                organizations={organizations}
                categories={organizationSubjects}
                selectedSlug={params.slug}
            />
        </div>
    );
}
