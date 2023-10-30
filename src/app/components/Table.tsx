import { Verb } from "@/domain/Verb";

type TableProps = {
  verbs: Verb[]
}

export const Table = ({verbs}: TableProps) => {
  return(
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
        verbs.map(verb =>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={verb.id}>
            <td className="px-6 py-4">{verb.translation}</td>
            <td className="px-6 py-4">{verb.infinitive}</td>
            <td className="px-6 py-4">{verb.pastTense}</td>
            <td className="px-6 py-4">{verb.pastParticiple}</td>
          </tr>
        )
      }
    </tbody>
    </table>
  )
}
