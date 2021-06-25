import { ReactNode } from 'react'
import cx from 'classnames'
import './styles.scss'


type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children,
}: QuestionsProps) {
    return (
        <div
            className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered },
            )}
        >
            <div className="question-header">
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>

                <div>{children}</div>
            </div>
            <p>{content}</p>

        </div>
    )
}