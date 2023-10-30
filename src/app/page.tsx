import { Verb } from '@/domain/Verb';
import { FindAllVerbs } from '@/application/FindAllVerbs';
import { FileSystemVerbRepository } from '@/infrastructure/FileSystemVerbRepository';
import { Table } from './components/Table';

export default function Home() {
  const data: Verb[] = new FindAllVerbs(new FileSystemVerbRepository).execute();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative overflow-x-auto"><Table verbs={data}/></div>
    </main>
  )
}
