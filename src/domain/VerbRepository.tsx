import { Verb } from "./Verb";

export interface VerbRepository {
    all: () => Verb[];
}
