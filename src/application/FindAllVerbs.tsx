import { Verb } from "@/domain/Verb";
import { VerbRepository } from "@/domain/VerbRepository";

export class FindAllVerbs {
    private repository: VerbRepository;

    constructor(repository: VerbRepository) {
        this.repository = repository;
    }

    execute(): Verb[] {
        let verbs = this.repository.all();
        return verbs.map(verb => {
                const column = Math.floor(Math.random() * 4);
                console.log('column: ' + column);
                switch(column) {
                    case 0:
                        return new Verb(
                            verb.id,
                            verb.infinitive,
                            '',
                            '',
                            '',
                        )
                    case 1:
                        return new Verb(
                            verb.id,
                            '',
                            verb.pastTense,
                            '',
                            '',
                        )
                    case 2:
                        return new Verb(
                            verb.id,
                            '',
                            '',
                            verb.pastParticiple,
                            '',
                        )
                    case 3:
                        return new Verb(
                            verb.id,
                            '',
                            '',
                            '',
                            verb.translation
                        )
                }
                return verb;
            }
        );
    }
}
