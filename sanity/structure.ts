import type { StructureResolver } from "sanity/structure";

const groupedTypes = [
  "submission",
  "magazine",
  "gallery",
  "book",
  "organization",
  "author",
  "comment",
  "category",
  "tag",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Data")
    .items([
      // Content Management
      S.listItem()
        .title("Content Management")
        .child(
          S.list()
            .title("Content Management")
            .items([
              S.documentTypeListItem("submission").title("Website Submissions"),
              S.documentTypeListItem("gallery").title("Gallery Submissions"),
              S.documentTypeListItem("magazine").title("Magazine Submissions"),
              S.documentTypeListItem("book").title("Book Submissions"),
              S.documentTypeListItem("organization").title(
                "Organizations",
              ),
              S.divider(),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),

      // Interaction Management
      S.listItem()
        .title("Interaction Management")
        .child(
          S.list()
            .title("Interaction Management")
            .items([
              S.documentTypeListItem("comment").title("Comments"),
            ]),
        ),

      // Taxonomy
      S.listItem()
        .title("Taxonomy")
        .child(
          S.list()
            .title("Taxonomy")
            .items([
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("tag").title("Tags"),
            ]),
        ),

      S.divider(),

      // Everything else
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !groupedTypes.includes(item.getId()!),
      ),
    ]);