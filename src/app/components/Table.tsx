'use client'

import { ValidateVerbs } from "@/application/ValidateVerbs";
import { Verb } from "@/domain/Verb";
import { FileSystemVerbRepository } from "@/infrastructure/FileSystemVerbRepository";
import React, { useState } from "react";

async function validate(answers: Answers): Promise<Answers> {
  const validated: Answers = new Map(new ValidateVerbs(new FileSystemVerbRepository()).execute([...answers].map(pair => new Verb(
    pair[0],
    pair[1].infinitive.verb,
    pair[1].pastTense.verb,
    pair[1].pastParticiple.verb,
    pair[1].translation.verb,
  ))).map(validated =>
    [validated.id, {
      translation: { verb: validated.translation.attempt, answer: validated.translation.answer, isValid: validated.translation.isCorrect() },
      infinitive: { verb: validated.infinitive.attempt, answer: validated.infinitive.answer, isValid: validated.infinitive.isCorrect() },
      pastTense: { verb: validated.pastTense.attempt, answer: validated.pastTense.answer, isValid: validated.pastTense.isCorrect() },
      pastParticiple: { verb: validated.pastParticiple.attempt, answer: validated.pastParticiple.answer, isValid: validated.pastParticiple.isCorrect() },
    }]
  ));
  return new Promise<Answers>((resolve, reject) => {
    setTimeout(() => {
      let shouldError = false;
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve(validated);
      }
    }, 0);
  });
}

type TableProps = {
  verbs: Verb[]
}

type Verb2 = {
  readonly translation: Answer;
  readonly infinitive: Answer;
  readonly pastTense: Answer;
  readonly pastParticiple: Answer;
}

type Tense = keyof Verb2;

type Answer = {
  verb: string;
  answer: string | null;
  isValid: null | boolean;
}

type Answers = Map<string, Verb2>;

export const Table = ({ verbs }: TableProps) => {
  const [answers, setAnswers] = useState<Answers>(new Map(verbs.map(verb => {
    const translation = verb.translation === '' ? null : verb.translation;
    const infinitive = verb.infinitive === '' ? null : verb.infinitive;
    const pastTense = verb.pastTense === '' ? null : verb.pastTense;
    const pastParticiple = verb.pastParticiple === '' ? null : verb.pastParticiple;
    return [verb.id, {
      translation: { verb: translation ?? '', isValid: null, answer: translation },
      infinitive: { verb: infinitive ?? '', isValid: null, answer: infinitive },
      pastTense: { verb: pastTense ?? '', isValid: null, answer: pastTense },
      pastParticiple: { verb: pastParticiple ?? '', isValid: null, answer: pastParticiple }
    }]
  }
  )));
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState('pending');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const validAnswers = await validate(answers);
      setAnswers(validAnswers);
      setStatus('success');
    } catch (err: Error | any) {
      setStatus('error');
      setError(err);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tense = e.target.name as Tense;
    const answer = { ...answers.get(e.target.id)?.[tense], ...{ verb: e.target.value } } as Answer;
    const newVerb = { ...answers.get(e.target.id), ...{ [e.target.name]: answer } } as Verb2;
    answers.set(e.target.id, newVerb);

    let isReady: boolean = true;
    answers.forEach(verb => {
      if (verb.translation.verb === '' || verb.infinitive.verb === '' || verb.pastTense.verb === '' || verb.pastParticiple.verb === '') {
        isReady = false;
        return;
      }
    })

    if (isReady) {
      setStatus('ready');
    }
  }

  const printCell = (answer: [string, Verb2], tense: Tense) =>
    <Cell verbId={answer[0]} name={tense} value={answer[1][tense].verb} answer={answer[1][tense].answer} isValid={answer[1][tense].isValid} onChange={handleInputChange} />

  return (
    <form className='shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Translation</th>
            <th scope="col" className="px-6 py-3">Infinitve</th>
            <th scope="col" className="px-6 py-3">Past Tense</th>
            <th scope="col" className="px-6 py-3">Past Participle</th>
          </tr>
        </thead>
        <tbody>
          {
            [...answers].map(answer =>
              <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700" key={answer[0]}>
                {printCell(answer, 'translation')}
                {printCell(answer, 'infinitive')}
                {printCell(answer, 'pastTense')}
                {printCell(answer, 'pastParticiple')}
              </tr>
            )
          }
        </tbody>
      </table>
      <div className="py-4 flex items-center justify-center">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          hidden={status !== 'ready' && status !== 'pending'}
        >
          Validate
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          hidden={status !== 'success' && status !== 'error'}
          onClick={() => window.location.reload()}
        >Start again
        </button>
      </div>

      {error !== null &&
        <p className="Error">
          {error.message}
        </p>
      }
    </form>
  )
}

type CellProps = {
  verbId: string;
  name: string;
  value: string;
  answer: string | null;
  isValid: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Cell = ({ verbId, name, value, answer, isValid, onChange }: CellProps) => {
  if (isValid !== null && isValid !== undefined && !isValid) {
    return (<td className="px-6 py-4 bg-red-700"><s>{value}</s> {'->'} <strong>{answer}</strong></td>);
  }
  return (
    <td className="px-6 py-4">
      {
        answer === null ?
          <input
            className="text-gray-800 w-40"
            type="text"
            id={verbId}
            name={name}
            onChange={onChange}
            autoComplete="off"
            required
          ></input> : value
      }
    </td>
  )
}
