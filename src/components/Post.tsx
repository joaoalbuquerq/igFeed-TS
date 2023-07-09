import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Avatar } from './Avatar.tsx'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Author {
    name: string,
    role: string,
    avatarUrl:string
}

interface PostProps{
    author: Author,
    publishedAt: Date,
    content: Content[]
}

interface Content{
    type: 'paragraph' | 'link',
    content: string
}


export function Post({author, publishedAt, content} : PostProps){

    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'" ,{locale:ptBR});

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const [comments, setComments] = useState(['Post muito massa!'])

    const [newCommentText, setNewCommentText] = useState('')

    function handleCreateNewComment(event : FormEvent){
        event.preventDefault()
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentTextChange(event : ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete : string){

        const newListComment = comments.filter(comment => {
            return comment != commentToDelete
        })

        setComments(newListComment)
    }

    function handleNewCommentInvalid(event : InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity("Este campo é obrigatório!")
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>

                    <Avatar src={author.avatarUrl}/>

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time dateTime={publishedAt.toISOString()} title={publishedDateFormated}>
                    {publishedDateRelativeToNow} 
                </time>
            </header>

            <section className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    }else if(line.type === 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </section>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name='comment'
                    placeholder='Que tal comentar sobre os pontos mais interessantes da publicação ?' 
                    value={newCommentText}
                    onChange={handleNewCommentTextChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
                
            </form>

            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        return (
                            <Comment 
                                key={comment} 
                                content={comment}
                                onDeleteComment={deleteComment}
                            />
                        )
                    })
                }
            </div>
        </article>
    )
}