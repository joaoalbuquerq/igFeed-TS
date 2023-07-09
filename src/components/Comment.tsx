import { Avatar } from './Avatar.tsx'
import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { useState } from 'react'

interface CommentProps{
    content: string,
    onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment} : CommentProps){

    const [likeCount, setLikeCount] = useState(0)
    
    function handleDeleteComment(){
        onDeleteComment(content)
    }

    function handleLikeComment(){
        setLikeCount(likeCount + 1)
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/michellibrito.png" alt=""/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>

                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Micheli Brito</strong>
                            <time dateTime='2023-04-19 19:00:00' title='19 de Abril as 19h'>
                                Cerca de 1h atrás
                            </time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={20} />
                        </button>
                    </header>

                    <p>{content}</p>

                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir 
                        <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}