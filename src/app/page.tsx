import Greeting from './components/Greeting'
import TodoList from './components/TodoList'

export default function Home() {
  return (
    <div className="flex flex-1 justify-center px-4 py-16">
      <div className="flex w-full max-w-lg flex-col gap-10">
        <Greeting />
        <TodoList />
        <footer className="mt-auto pt-8 text-sm text-zinc-400 dark:text-zinc-600">
          <a
            href="https://github.com/26kalliew"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub →
          </a>
        </footer>
      </div>
    </div>
  )
}
