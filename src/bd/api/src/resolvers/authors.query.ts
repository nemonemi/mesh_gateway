import { authors } from "./modules/authors";
import type {ExistingAuthor} from "../../.mesh";

export default {
  initializeStore: (storeInitializer: any) => {
    // Populate the store with the list of author
    storeInitializer.set("Query", "ROOT", { authors });

    // Populate the store with the individual authors for the individual querying
    authors.forEach((author: ExistingAuthor) => {
      storeInitializer.set("ExistingAuthor", author.id, author);
    });

    storeInitializer.set('AuthorDoesNotExistError', 'authorDoesNotExistError', {
      message: `Sorry...`,
    });
  },

  author: (_, { id }, { mockStore }) => {
    const authorsRef = mockStore.get('Query', 'ROOT', 'authors');
    const existingAuthor = authorsRef.find((authorRef) => authorRef.$ref.key === id);

    if (!existingAuthor) {
      return { $ref: { key: 'authorDoesNotExistError', typeName: 'AuthorDoesNotExistError' } };
    }

    return mockStore.get("ExistingAuthor", id);
  },
};
