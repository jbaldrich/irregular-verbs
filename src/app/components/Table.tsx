'use client'

import { Verb } from "@/domain/Verb";
import React, { useState } from "react";

function validate(answers: Answers): Promise<Answers> {
  const validated: Answers = new Map([...answers].map(answer =>
    [answer[0], {
      translation: { verb: answer[1].translation.verb ?? '', isValid: answer[1].translation.verb != ''},
      infinitive: { verb: answer[1].infinitive.verb ?? '', isValid: answer[1].infinitive.verb != ''},
      pastTense: { verb: answer[1].pastTense.verb ?? '', isValid: answer[1].pastTense.verb != ''},
      pastParticiple: { verb: answer[1].pastParticiple.verb ?? '', isValid: answer[1].pastParticiple.verb != ''}
    }]
  ))
  return new Promise<Answers>((resolve, reject) => {
    setTimeout(() => {
      let shouldError = false;
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve(validated);
      }
    }, 1500);
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

type Answer = {
  verb: string;
  isValid: null | boolean;
}

type Answers = Map<string, Verb2>;

export const Table = ({verbs}: TableProps) => {
  const [answers, setAnswers] = useState<Answers>(new Map(verbs.map(verb => 
    [verb.id, {
      translation: { verb: verb.translation ?? '', isValid: null},
      infinitive: { verb: verb.infinitive ?? '', isValid: null},
      pastTense: { verb: verb.pastTense ?? '', isValid: null},
      pastParticiple: { verb: verb.pastParticiple ?? '', isValid: null}
    }]
  )));
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState('pending');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const validAnswers = await validate(answers);
      setAnswers(validAnswers);
      setStatus('success');
    } catch (err: Error | any) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVerb = {...answers.get(e.target.id), [e.target.name]:{verb: e.target.value}} as Verb2;
    answers.set(e.target.id, newVerb);
  }

  return(
    <div>
      <div>
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
                    <Cell verbId={answer[0]} name='translation' value={answer[1].translation.verb} isValid={answer[1].translation.isValid} onChange={handleInputChange}/>
                    <Cell verbId={answer[0]} name='infinitive' value={answer[1].infinitive.verb} isValid={answer[1].infinitive.isValid} onChange={handleInputChange}/>
                    <Cell verbId={answer[0]} name='pastTense' value={answer[1].pastTense.verb} isValid={answer[1].pastTense.isValid} onChange={handleInputChange}/>
                    <Cell verbId={answer[0]} name='pastParticiple' value={answer[1].pastParticiple.verb} isValid={answer[1].pastParticiple.isValid} onChange={handleInputChange}/>
                  </tr>
                )
              }
            </tbody>
          </table>
          <button disabled={
            status === 'submitting'
          }>
            Submit
          </button>
          {error !== null &&
            <p className="Error">
              {error.message}
            </p>
          }
        </form>
      </div>
    </div>
  )
}

type CellProps = {
  verbId: string
  name: string
  value: string
  isValid: boolean | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Cell = ({verbId, name, value, isValid, onChange}: CellProps) => {
  return(
    <td className="px-6 py-4">
      {
        value == '' && (isValid === null || !isValid) ? 
          <input 
            className="text-gray-800" 
            type="text" 
            id={verbId}
            name={name}
            onChange={onChange}
          ></input> : value
      }
    </td>
  )
}
