import './global.css'
import { Header } from "./components/Header";
import {Post} from './components/Post'
import styles from './App.module.css'
import { Sidebar } from './components/Sidebar';
import {PostType} from './components/Post';

const posts: PostType[] =[
  {
    id:1,
    author: {
      avatarUrl:"https://avatars.githubusercontent.com/u/69771492?v=4",
      name:"Facebook by Meta",
      role:"Enterprise"
    },
    content: [
        {type: 'paragraph', content: 'Fala galeraa 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        {type: 'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date()
  },
  {
    id:2,
    author: {
      avatarUrl:"https://github.com/twitter.png",
      name:"Twitter by Meta",
      role:"Enterprise"
    },
    content: [
        {type: 'paragraph', content: 'iai pessoal, tudo bem ? 👋'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Copa, evento da Rocketseat. O nome do projeto é Tijolinho 🚀'},
        {type: 'link', content: 'jane.design/tijolinho'}
    ],
    publishedAt: new Date()
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          {
            posts.map(post => {
              return(
                <Post
                  key={post.id} 
                  post={post}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}

