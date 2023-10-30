import { Verb } from "@/domain/Verb";
import { VerbRepository } from "@/domain/VerbRepository";

export class FindAllVerbs {
    private repository: VerbRepository;

    constructor(repository: VerbRepository) {
        this.repository = repository;
    }

    execute(): Verb[] {
        return this.repository.all();
    }
}
