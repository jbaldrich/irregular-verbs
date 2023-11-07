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
          "translation": "arribar a ser/esdevenir",
          "infinitve": "become",
          "pastTense": "became",
          "pastParticiple": "become"
        },
        {
          "id": "3",
          "translation": "mossegar",
          "infinitve": "bite",
          "pastTense": "bit",
          "pastParticiple": "bitten"
        },
        {
          "id": "4",
          "translation": "trencar",
          "infinitve": "break",
          "pastTense": "broke",
          "pastParticiple": "broken"
        },
        {
          "id": "5",
          "translation": "portar",
          "infinitve": "bring",
          "pastTense": "brought",
          "pastParticiple": "brought"
        },
        {
          "id": "6",
          "translation": "construir",
          "infinitve": "build",
          "pastTense": "built",
          "pastParticiple": "built"
        },
        {
          "id": "7",
          "translation": "comprar",
          "infinitve": "buy",
          "pastTense": "bought",
          "pastParticiple": "bought"
        },
        {
          "id": "8",
          "translation": "poder",
          "infinitve": "can",
          "pastTense": "could",
          "pastParticiple": "been able"
        },
        {
          "id": "9",
          "translation": "agafar al vol",
          "infinitve": "catch",
          "pastTense": "caught",
          "pastParticiple": "caught"
        },
        {
          "id": "10",
          "translation": "venir",
          "infinitve": "come",
          "pastTense": "came",
          "pastParticiple": "come"
        },
        {
          "id": "11",
          "translation": "costar",
          "infinitve": "cost",
          "pastTense": "cost",
          "pastParticiple": "cost"
        },
        {
          "id": "12",
          "translation": "fer",
          "infinitve": "do",
          "pastTense": "did",
          "pastParticiple": "done"
        },
        {
          "id": "13",
          "translation": "dibuixar",
          "infinitve": "draw",
          "pastTense": "drew",
          "pastParticiple": "drawn"
        },
        {
          "id": "14",
          "translation": "somiar",
          "infinitve": "dream",
          "pastTense": "dreamt",
          "pastParticiple": "dreamt"
        },
        {
          "id": "15",
          "translation": "beure",
          "infinitve": "drink",
          "pastTense": "drank",
          "pastParticiple": "drunk"
        },
        {
          "id": "16",
          "translation": "conduir",
          "infinitve": "drive",
          "pastTense": "drove",
          "pastParticiple": "driven"
        },
        {
          "id": "17",
          "translation": "menjar",
          "infinitve": "eat",
          "pastTense": "ate",
          "pastParticiple": "eaten"
        },
        {
          "id": "18",
          "translation": "caure",
          "infinitve": "fall",
          "pastTense": "fell",
          "pastParticiple": "fallen"
        },
        {
          "id": "19",
          "translation": "sentir-se",
          "infinitve": "feel",
          "pastTense": "felt",
          "pastParticiple": "felt"
        },
        {
          "id": "20",
          "translation": "trobar",
          "infinitve": "find",
          "pastTense": "found",
          "pastParticiple": "found"
        },
        {
          "id": "21",
          "translation": "volar",
          "infinitve": "fly",
          "pastTense": "flew",
          "pastParticiple": "flown"
        },
        {
          "id": "22",
          "translation": "oblidar",
          "infinitve": "forget",
          "pastTense": "forgot",
          "pastParticiple": "forgotten"
        },
        {
          "id": "23",
          "translation": "aconseguir/obtenir",
          "infinitve": "get",
          "pastTense": "got",
          "pastParticiple": "got"
        },
        {
          "id": "24",
          "translation": "donar",
          "infinitve": "give",
          "pastTense": "gave",
          "pastParticiple": "given"
        },
        {
          "id": "25",
          "translation": "anar",
          "infinitve": "go",
          "pastTense": "went",
          "pastParticiple": "gone"
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
