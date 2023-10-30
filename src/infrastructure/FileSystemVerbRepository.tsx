import { Verb } from "@/domain/Verb";
import { VerbRepository } from "@/domain/VerbRepository";

export class FileSystemVerbRepository implements VerbRepository {
    private data = [
        {
          "id": "1",
          "translation": "ser/estar",
          "infinitve": "be",
          "pastTense": "was/were",
          "pastParticiple": "been"
        },
        {
          "id": "2",
          "translation": "ser/estar",
          "infinitve": "be",
          "pastTense": "was/were",
          "pastParticiple": "been"
        }
      ];
    all(): Verb[] {
        return this.data.map( json =>
            new Verb(
                json.id,
                json.infinitve,
                json.pastTense,
                json.pastParticiple,
                json.translation
            )
        )
    }
}
