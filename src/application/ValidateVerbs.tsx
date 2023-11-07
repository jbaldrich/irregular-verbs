import { Verb } from "@/domain/Verb";
import { VerbRepository } from "@/domain/VerbRepository";

export type ValidateVerbsRequest = Verb[];

class Validation {
    readonly attempt: string;
    readonly answer: string;

    constructor(attempt: string, answer: string) {
        this.attempt = attempt;
        this.answer = answer;
    }

    isCorrect(): boolean {
        return this.attempt
            .toLowerCase()
            .replace('  ', ' ')
            .split('/')
            .map(val => val.trim())
            .join('/')
            === this.answer;
    }
}

export class ValidatedVerb {
    readonly id: string;
    readonly translation: Validation;
    readonly infinitive: Validation;
    readonly pastTense: Validation;
    readonly pastParticiple: Validation;

    constructor(
        id: string,
        translation: Validation,
        infinitive: Validation,
        pastTense: Validation,
        pastParticiple: Validation
    ) {
        this.id = id;
        this.translation = translation;
        this.infinitive = infinitive;
        this.pastTense = pastTense;
        this.pastParticiple = pastParticiple;
    }

    areAllCorrect(): boolean {
        return this.translation.isCorrect()
            && this.infinitive.isCorrect()
            && this.pastTense.isCorrect()
            && this.pastParticiple.isCorrect();
    }
}

export type ValidateVerbsResponse = ValidatedVerb[]

export class ValidateVerbs {
    private repository: VerbRepository;

    constructor(repository: VerbRepository) {
        this.repository = repository;
    }

    execute(request: ValidateVerbsRequest): ValidateVerbsResponse {
        let answers = new Map(this.repository.all().map(verb => [verb.id, verb]));
        return request.map(verb =>
            new ValidatedVerb(
                verb.id,
                new Validation(verb.translation, answers.get(verb.id)?.translation ?? ''),
                new Validation(verb.infinitive, answers.get(verb.id)?.infinitive ?? ''),
                new Validation(verb.pastTense, answers.get(verb.id)?.pastTense ?? ''),
                new Validation(verb.pastParticiple, answers.get(verb.id)?.pastParticiple ?? '')
            )
        );
    }
}
