export class Verb {
    readonly id: string;
    readonly infinitive: string;
    readonly pastTense: string;
    readonly pastParticiple: string;
    readonly translation: string;

    constructor(id: string, infinitive: string, pastTense: string, pastParticiple: string, translation: string) {
        this.id = id;
        this.infinitive = infinitive;
        this.pastTense = pastTense;
        this.pastParticiple = pastParticiple;
        this.translation = translation;
    }
}
