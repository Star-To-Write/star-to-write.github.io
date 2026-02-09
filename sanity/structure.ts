import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Website Submissions")
        .items([
            S.documentTypeListItem("submission").title("Submissions"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("tag").title("Tags"),
            S.documentTypeListItem("comment").title("Comments"),

            S.divider(),
            ...S.documentTypeListItems().filter(
                (item) =>
                    item.getId() &&
                    ![
                        "submission",
                        "author",
                        "category",
                        "tag",
                        "comment",
                    ].includes(item.getId()!),
            ),
        ]);
