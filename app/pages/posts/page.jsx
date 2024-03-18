import './styles.css'
export default function Posts() {
    return (
        <div className={'page-container'}>
            <div className={'post-wrapper'}>
                <input type="text" className={'posts-input'}/>
                <button className={'post-btn'}>GO!</button>
            </div>
        </div>
    )
}

