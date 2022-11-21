import DraggableTabs from './components/DraggableTabs';

const tabItems = [
  'Coding',
  'Javascript',
  'Podcast',
  'Databases',
  'Web Development',
  'Unboxing',
  'History',
  'Programming',
  'Gadgets',
  'Algorithms',
  'Gaming',
  'Comedy',
  'Share Market',
  'Smartphones',
  'Data Structure',
];

export default function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-bl from-rose-800 to-rose-400">
      <DraggableTabs tabItems={tabItems} />
    </div>
  );
}
