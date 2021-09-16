import { authors } from "./modules/authors.ts";
import {ExistingAuthor} from "../../.mesh";

export default {
  initializeStore: (storeInitializer: any) => {
    // Populate the store with the list of author
    storeInitializer.set("Query", "ROOT", { authors });

    // Populate the store with the individual authors for the individual querying
    authors.forEach((author: ExistingAuthor) => {
      storeInitializer.set("ExistingAuthor", author.id, author);
    });
  },

  author: (_, { id }, { mockStore }) => {
    if (id === "n") {
      return {
        __typename: "AuthorDoesNotExistError",
        message: "Sorry...",
      };
    }

    return mockStore.get("ExistingAuthor", id);
  },
};
